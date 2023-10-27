const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "jonas",
    port: 5432,
    password: "lskdjf",
    database: "proton",
});

module.exports = pool;
