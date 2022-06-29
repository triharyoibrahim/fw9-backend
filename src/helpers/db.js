const { Pool } = require("pg");
const { DATABASE_URL: connectionString } = process.env;

const db = new Pool({ connectionString });

module.exports = db;
