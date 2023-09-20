//Criar diretório server se o mesmo não existir
//"npm init" nesse diretorio e depois "npm i express pg cors" se o diretório acabou de ser criado
//"npm install" no diretório do server se ele já foi criado antes
//"npm install -g nodemon" caso n tenha instalado na sua maquina ainda
//"nodemon index" para deixar o servidor rodando
//note que é necessário rodar outro terminal para rodar a aplicação com npm start e deixar os dois rodando ao mesmo tempo

const express = require('express');
const cors = require('cors');
const pool = require("./db")
const app = express();

//Middleware
app.use(cors());
app.use(express.json())

//Rotas

//Select All
app.get("/get_usuario", async (req,res) => {
    try {
        const selectAll = await pool.query("select * from usuario")
        res.json(selectAll.rows)
    } catch (error) {
        console.log(error.message)
    }
})
/*
//Insert dados (Post)
app.post("/insert", async (req,res) => {
    try {
        //console.log(req.body)

        const {usuario_nome } = req.body
        const {usuario_senha } = req.body
        //console.log(usuario_nome)
        //console.log(usuario_senha)

        const newUsah = await pool.query(
            "insert into usuario values (default,$1, $2, '2023-09-13','CL','future_gadget@gmail.com') returning *", [usuario_nome, usuario_senha]
        )

        res.json(newUsah.rows[0])

    } catch (error) {
        console.log(error.message)
    }
})
*/
app.listen(5000, () => {
    console.log('deu bão');
})