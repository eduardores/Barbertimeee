
const { Pool } = require("pg");

const URL_PG = "postgresql://postgres:123@localhost:5432/barbertime"; // Ajuste se necessário

const database = new Pool({
  connectionString: URL_PG,
});

module.exports = database;
