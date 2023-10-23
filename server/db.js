const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Pitoco22",
  database: "proton",
});

module.exports = pool;
