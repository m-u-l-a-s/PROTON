//Criar diretório server se o mesmo não existir
//"npm init" nesse diretorio e depois "npm i express pg cors" se o diretório acabou de ser criado
//"npm install" no diretório do server se ele já foi criado antes
//"npm install -g nodemon" caso n tenha instalado na sua maquina ainda
//"nodemon index" para deixar o servidor rodando
//note que é necessário rodar outro terminal para rodar a aplicação com npm start e deixar os dois rodando ao mesmo tempo

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Configuração do Multer para upload de arquivos em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Rotas

//Select All
app.get("/get_usuario", async (req, res) => {
  try {
    const selectAll = await pool.query("select * from usuario");
    res.json(selectAll.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get_processos", async (req, res) => {
  try {
    const selectAll = await pool.query("SELECT * FROM public.processo ORDER BY processo_id ASC ");
    res.json(selectAll.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get_etapa", async (req, res) => {
  try {
    const selectAll = await pool.query("SELECT * FROM public.etapa ORDER BY etapa_id ASC ");
    res.json(selectAll.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get_usuario", async (req, res) => {
  try {
    const selectAll = await pool.query("SELECT * FROM public.usuario ORDER BY usuario_nome");
    res.json(selectAll.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//Insert dados (Post)
app.post("/insert_etapa", async (req, res) => {
  try {
    const { processo_id } = req.body;
    const { etapa_nome } = req.body;
    const { etapa_responsavel_id } = req.body;
    const { etapa_ordem } = req.body;
    const { etapa_data_conclusao } = req.body;
    const { etapa_descricao } = req.body;
    const { etapa_status } = req.body;
    const { etapa_comentario } = req.body;
    const novaEtapa = await pool.query(
      "insert into etapa values (default,$1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [
        processo_id,
        etapa_nome,
        etapa_responsavel_id,
        etapa_ordem,
        etapa_data_conclusao,
        etapa_descricao,
        etapa_status,
        etapa_comentario,
      ]
    );

    res.json(novaEtapa.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//Criar processos

app.post("/insert_processo", async (req, res) => {
  try {
    console.log(req.body);

    const { processo_nome } = req.body;
    const { processo_responsavel_id } = req.body;
    const { processo_descricao } = req.body;

    const novaEtapa = await pool.query("insert into processo values (default,$1, $2, $3) returning *", [
      processo_nome,
      processo_responsavel_id,
      processo_descricao,
    ]);

    res.json(novaEtapa.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//selecionar etapa pelo id

app.get("/get_etapa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const etapa = await pool.query("select * from etapa where etapa_id=$1", [id]);

    res.json(etapa.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/get_etapa_by_processo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const etapa = await pool.query("select * from etapa where processo_id=$1 order by etapa_ordem", [id]);

    res.json(etapa.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// deletar etapa
app.delete("/deletarEtapa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const etapa = await pool.query("delete from etapa where etapa_id =$1", [id]);

    res.json(etapa.rows);
  } catch (err) {
    console.log(err.message)
  }
}
);

// deletar processo 
app.delete("/deletarProcesso/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const processo = await pool.query("delete from processo where processo_id =$1", [id]);

    res.json(processo.rows);
  } catch (err) {
    console.log(err.message)
  }
}
);

//puxar nome e descrição do processo pelo id do mesmo

app.get("/get_processo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const etapa = await pool.query("select processo_nome,processo_descricao from processo where processo_id=$1", [id]);

    res.json(etapa.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// ------- ROTAS ANEXOS ------- //

// ------- ROTAS POST ------- //

// --- Rota POST para inserir anexos por etapa --- //
app.post("/insert_anexo", upload.array("files", 10), async (req, res) => {
  const files = req.files;
  const etapa_id = req.body.etapa_id; // Obtém o etapa_id da solicitação POST

  try {
    // Verifique se req.files contém algum arquivo
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    // Inicia uma transação para garantir a atomicidade da operação
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Inserir cada arquivo na tabela etapa_anexo
      const insertedIds = [];
      for (const file of files) {
        const fileData = file.buffer;

        const query =
          "INSERT INTO etapa_anexo (etapa_id, etapa_anexo_documento) VALUES ($1, $2) RETURNING etapa_anexo_id";
        const values = [etapa_id, fileData];
        const result = await client.query(query, values);
        insertedIds.push(result.rows[0].etapa_anexo_id);
        console.log(`Arquivo inserido com sucesso. ID do anexo: ${result.rows[0].etapa_anexo_id}`);
      }

      // Commit da transação
      await client.query("COMMIT");

      res.json({ anexoIds: insertedIds });
    } catch (error) {
      // Rollback da transação em caso de erro
      await client.query("ROLLBACK");
      throw error;
    } finally {
      // Libere o cliente da pool após a conclusão
      client.release();
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// -------------------- //

// ------- ROTAS GET ------- //

// --- Rota GET para obter todos os anexos --- //
app.get("/get_anexos", async (req, res) => {
  try {
    // Consulta o banco de dados para obter todos os anexos
    const query = "SELECT * FROM etapa_anexo";
    const result = await pool.query(query);

    // Envia a lista de anexos como resposta
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar anexos:", error);
    res.status(500).json({ error: "Erro ao buscar anexos" });
  }
});

// -------------------- //

// --- Rota GET para obter anexos por ID de etapa e o contador de anexos --- //
app.get("/get_anexos_by_etapa/:etapaId", async (req, res) => {
  try {
    const { etapaId } = req.params;
    
    // Consulta o banco de dados para obter todos os anexos associados à etapa especificada
    const queryAnexos = "SELECT * FROM etapa_anexo WHERE etapa_id = $1";
    const anexosResult = await pool.query(queryAnexos, [etapaId]);
    
    // Consulta o banco de dados para obter o contador de anexos
    const queryContador = "SELECT COUNT(*) FROM etapa_anexo WHERE etapa_id = $1";
    const contadorResult = await pool.query(queryContador, [etapaId]);
    
    const anexos = anexosResult.rows;
    const contador = contadorResult.rows[0].count;

    // Envia a lista de anexos e o contador como resposta
    res.json({ anexos, contador });
  } catch (error) {
    console.error("Erro ao buscar anexos por etapa:", error);
    res.status(500).json({ error: "Erro ao buscar anexos por etapa" });
  }
});

// -------------------- //

//Puxando nome do responsável do projeto pelo id

app.get("/get_processos_responsavelNome", async (req, res) => {
  try {
    const selectAll = await pool.query("SELECT * FROM public.processo ORDER BY processo_id ASC ");
    

    const processosComNomes = await Promise.all(selectAll.rows.map(async (processo) => {
      const responsavel = await pool.query("SELECT usuario_nome FROM public.usuario WHERE usuario_id = $1", [processo.processo_responsavel_id]);
      return {
        ...processo,
        processo_responsavel_nome: responsavel.rows[0].usuario_nome,
      };
    }));

    res.json(processosComNomes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao obter processos' });
  }
});


app.listen(5000, () => {
  console.log("Servidor Funcionando");
});