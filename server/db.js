const Pool = require("pg").Pool;
const  dotenv = require('dotenv');

dotenv.config();

//Comentar esse trecho ao conectar com elephantSQL
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Dev123",
    database: "proton",
});

//Descomentar esse trecho ao conectar com elephantSQL
// const pool = new Pool({
//     connectionString: process.env.URLCloud, 
// });

module.exports = pool;
