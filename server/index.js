//Criar diretório server se o mesmo não existir
//"npm init" nesse diretorio e depois "npm i express pg cors" se o diretório acabou de ser criado
//"npm install" no diretório do server se ele já foi criado antes
//"npm install -g nodemon" caso n tenha instalado na sua maquina ainda
//"nodemon index" para deixar o servidor rodando
//note que é necessário rodar outro terminal para rodar a aplicação com npm start e deixar os dois rodando ao mesmo tempo

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

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

//Insert dados (Post)
app.post("/insert_etapa", async (req,res) => {
    try {
        

        const {processo_id } = req.body
        const {etapa_nome } = req.body
        const {etapa_responsavel_id } = req.body
        const {etapa_ordem } = req.body
        const {etapa_data_conclusao } = req.body
        const {etapa_descricao } = req.body
        const {etapa_status } = req.body
        const {etapa_comentario } = req.body

       
        

        const novaEtapa = await pool.query(

          "insert into etapa values (default,$1, $2, $3, $4, $5, $6, $7, $8) returning *", [processo_id, etapa_nome, etapa_responsavel_id , etapa_ordem, etapa_data_conclusao, etapa_descricao, etapa_status, etapa_comentario]
        )

        res.json(novaEtapa.rows[0])

    } catch (error) {
        console.log(error.message)
    }
})

//Criar processos

app.post("/insert_processo", async (req,res) => {
  try {
      console.log(req.body)

      const {processo_nome} = req.body;
      const {processo_responsavel_id} = req.body;
      const {processo_descricao} = req.body;

      console.log(processo_nome)
      console.log(processo_responsavel_id)
      console.log(processo_descricao)

      const novaEtapa = await pool.query(

        "insert into processo values (default,$1, $2, $3) returning *", [processo_nome, processo_responsavel_id,processo_descricao]
      )

      res.json(novaEtapa.rows[0])

  } catch (error) {
      console.log(error.message)
  }
});

app.listen(5000, () => {
  console.log("Servidor Funcionando");
});
