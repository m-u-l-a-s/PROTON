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

// ------- ROTAS POST ------- //

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

        const novaEtapa = await pool.query(
            "insert into processo values (default,$1, $2, $3) returning *",
            [processo_nome, processo_responsavel_id, processo_descricao]
        );

        res.json(novaEtapa.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Criar usuário
app.post("/insert_usuario", async (req, res) => {
    try {
        console.log(req.body);

        const { usuario_nome } = req.body;
        const { usuario_email } = req.body;
        const { usuario_senha } = req.body;
        const { usuario_data_cadastro } = req.body;
        const { usuario_nivel } = req.body;

        const novoUsuario = await pool.query(
            "insert into usuario values (default, $1, $2, $3, $4, $5) returning *",
            [
                usuario_nome,
                usuario_senha,
                usuario_data_cadastro,
                usuario_nivel,
                usuario_email,
            ]
        );

        res.json(novoUsuario.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

// ------- ROTAS GET ------- //

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
        const selectAll = await pool.query(
            "SELECT * FROM public.processo ORDER BY processo_id ASC "
        );
        res.json(selectAll.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/get_etapa", async (req, res) => {
    try {
        const selectAll = await pool.query(
            "SELECT * FROM public.etapa ORDER BY etapa_id ASC "
        );
        res.json(selectAll.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/get_usuario", async (req, res) => {
    try {
        const selectAll = await pool.query(
            "SELECT * FROM public.usuario ORDER BY usuario_nome"
        );
        res.json(selectAll.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// contando etapas
app.get("/get_numeroEtapa/:processo_id", async (req, res) => {
    try {
        const processo_id = req.params.processo_id;
        const result = await pool.query(
            "SELECT COUNT(*) FROM etapa where processo_id = $1",
            [processo_id]
        );

        res.json(result.rows[0].count);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Erro ao buscar o número de etapas" });
    }
});

//Puxando nome do responsável do projeto pelo id

app.get("/get_processos_responsavelNome", async (req, res) => {
    try {
        const selectAll = await pool.query(
            "SELECT * FROM public.processo ORDER BY processo_id ASC "
        );

        const processosComNomes = await Promise.all(
            selectAll.rows.map(async (processo) => {
                const responsavel = await pool.query(
                    "SELECT usuario_nome FROM public.usuario WHERE usuario_id = $1",
                    [processo.processo_responsavel_id]
                );
                return {
                    ...processo,
                    processo_responsavel_nome: responsavel.rows[0].usuario_nome,
                };
            })
        );

        res.json(processosComNomes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Erro ao obter processos" });
    }
});

//selecionar etapa pelo id

app.get("/get_etapa/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const etapa = await pool.query(
            "select * from etapa where etapa_id=$1",
            [id]
        );

        res.json(etapa.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/get_etapa_by_processo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const etapa = await pool.query(
            "select * from etapa where processo_id=$1 order by etapa_ordem",
            [id]
        );

        res.json(etapa.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//puxar nome e descrição do processo pelo id do mesmo

app.get("/get_processo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const etapa = await pool.query(
            "select processo_nome,processo_descricao, processo_responsavel_id from processo where processo_id=$1",
            [id]
        );

        res.json(etapa.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//Rota puxar dados do usuario p/ login
app.get("/get_usuario_login", async (req, res) => {
    try {
        const { email } = req.body;
        const { senha } = req.body;
        const etapa = await pool.query(
            "select * from usuario where usuario_email=$1 and usuario_senha = $2",
            [email, senha]
        );

        res.json(etapa.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//Rota para puxar processos que o usuário criou ou processos com etapas das quais ele é responsável

app.get("/get_processos_responsavel/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const etapa = await pool.query(
            "select * from processo where processo_id in (select processo_id from etapa where etapa_responsavel_id = $1)"
            + "or processo_responsavel_id = $1",
            [id]
        );

        res.json(etapa.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// ------- ROTAS UPDATE ------- //

//Update processo

app.put("/put_processo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { processo_nome } = req.body;
        const { processo_descricao } = req.body;

        console.log(processo_descricao);

        const updateProcesso = await pool.query(
            "UPDATE processo SET processo_nome= $1, processo_descricao= $2 WHERE processo_id = $3",
            [processo_nome, processo_descricao, id]
        );

        res.json("deu bom");
    } catch (error) {
        console.error(error.message);
    }
});

//Update etapa

app.put("/put_etapa/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { etapa } = req.body;

        const updateEtapa = await pool.query(
            "UPDATE etapa SET etapa_nome= $1, etapa_descricao= $2, etapa_responsavel_id = $3, etapa_ordem = $4, etapa_data_conclusao = $5, etapa_status = $6, etapa_comentario = $7 WHERE etapa_id = $8",
            [
                etapa.etapa_nome,
                etapa.etapa_descricao,
                etapa.etapa_responsavel_id,
                etapa.etapa_ordem,
                etapa.etapa_data_conclusao,
                etapa.etapa_status,
                etapa.etapa_comentario,
                id,
            ]
        );
    } catch (error) {
        console.error(error.message);
    }
});

// ------- ROTAS DELETE ------- //

// deletar etapa
app.delete("/deletarEtapa/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Excluindo os anexos associados à etapa
        await pool.query("delete from etapa_anexo where etapa_id = $1", [id]);

        // Excluindo etapa
        const etapa = await pool.query(
            "delete from etapa where etapa_id = $1",
            [id]
        );

        res.json(etapa.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Erro ao excluir etapa");
    }
});

// deletar processo
app.delete("/deletarProcesso/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Excluindo os anexos associados à etapa
        await pool.query(
            "delete from etapa_anexo where etapa_id in (select etapa_id from etapa where processo_id = $1)",
            [id]
        );

        // Excluindo etapa
        const etapa = await pool.query(
            "delete from etapa where processo_id = $1",
            [id]
        );

        // Excluindo o próprio processo
        const processo = await pool.query(
            "DELETE FROM processo WHERE processo_id = $1",
            [id]
        );

        res.json(processo.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Erro ao excluir processo");
    }
});

//deletar anexo
app.delete("/deletarAnexo/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Excluindo os anexos associados à etapa
        await pool.query("delete from etapa_anexo where etapa_anexo_id = $1", [id]);

        res.json(etapa.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Erro ao excluir anexo");
    }
});

// ------- ROTAS ANEXOS ------- //

// ------- ROTAS POST ------- //

// --- Rota POST para inserir anexos por etapa --- //
app.post("/insert_anexo", upload.array("files", 10), async (req, res) => {
    const files = req.files;
    const etapa_id = req.body.etapa_id; // Obtém o etapa_id da solicitação POST
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
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
            const currentDate = new Date(); // Obtém a data atual
            const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
                }`;

            for (const file of files) {
                const fileData = file.buffer;
                const query =
                    "INSERT INTO etapa_anexo (etapa_id, etapa_anexo_documento, etapa_anexo_nome, etapa_anexo_tipo, etapa_anexo_data) VALUES ($1, $2, $3, $4, $5) RETURNING etapa_anexo_id";
                const values = [
                    etapa_id,
                    fileData,
                    fileName,
                    fileType,
                    currentDate,
                ];
                const result = await client.query(query, values);
                insertedIds.push(result.rows[0].etapa_anexo_id);
                //console.log(`Arquivo inserido com sucesso. ID do anexo: ${result.rows[0].etapa_anexo_id}`);
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
        const queryContador =
            "SELECT COUNT(*) FROM etapa_anexo WHERE etapa_id = $1";
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

// ------- ROTAS DELETE ------- //

// deletar anexo
app.delete("/deletarAnexo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const etapa_anexo = await pool.query(
            "delete from etapa_anexo where etapa_anexo_id =$1",
            [id]
        );

        res.json(etapa_anexo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// -------------------- //


//contador de etapas pendentes
app.get('/contarEtapasPendentes/:responsavelId/:nivel', async (req, res) => {
    console.log("ola")
    try {
        console.log(req.body)
        const responsavelId = req.params.responsavelId;
        const nivel =  req.params.nivel 
        if (nivel ==='CL') {
              const etapa_status = await pool.query(
                " SELECT Count(*) FROM etapa WHERE etapa_status ='P' "

             
            )
            const count = etapa_status.rows[0].count;
            res.status(200).json({ count: count });
        } else {
              const etapa_status = await pool.query(

                "SELECT COUNT(*) FROM etapa WHERE etapa_responsavel_id = $1 AND etapa_status = 'P' ",

                [responsavelId]
            ) 
            const count = etapa_status.rows[0].count;
            res.status(200).json({ count: count });
        };


        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao contar as etapas pendentes' });
    }
});


// Contador de etapas concluídas 
app.get('/contarEtapasConcluidas/:responsavelId/:nivel', async (req, res) => {

    try {
        console.log(req.body)
        const responsavelId = req.params.responsavelId;
        const nivel =  req.params.nivel 

        if (nivel ==='CL') {
            const etapa_status = await pool.query(
                "SELECT Count(*) FROM etapa WHERE etapa_status ='C' "
            )
            const count = etapa_status.rows[0].count;
            res.status(200).json({ count: count });
        } 
        
        else {
            const etapa_status = await pool.query(
                "SELECT COUNT(*) FROM etapa WHERE etapa_responsavel_id = $1 AND etapa_status = 'C' ",
                [responsavelId]
            ) 
            const count = etapa_status.rows[0].count;
            res.status(200).json({ count: count });
        };
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao contar as etapas concluídas' });
    }
});

//Contador de etapas em aprovação

app.get('/contarEtapasEmAprovacao/:responsavelId/:nivel', async (req, res) => {

    try {
        console.log(req.body)
        const responsavelId = req.params.responsavelId;
        const nivel =  req.params.nivel 

        if (nivel ==='CL') {
            const etapa_status = await pool.query(
                "SELECT Count(*) FROM etapa WHERE etapa_status ='A' "
            )
            const count = etapa_status.rows[0].count;
            res.status(200).json({ count: count });
        } 
        
        else {
            const etapa_status = await pool.query(
                "SELECT COUNT(*) FROM etapa WHERE etapa_responsavel_id = $1 AND etapa_status = 'A' ",
                [responsavelId]
            ) 
            const count = etapa_status.rows[0].count;
            res.status(200).json({ count: count });
        };
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao contar as etapas em aprovação' });
    }
});



app.listen(5000, () => {
    console.log("Servidor Funcionando");
});

















