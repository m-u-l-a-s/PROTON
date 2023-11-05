const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Dev123",
    database: "proton",
});

module.exports = pool;
