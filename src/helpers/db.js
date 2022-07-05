const { Pool, Query } = require("pg");
const { DATABASE_URL: connectionString } = process.env;

const submit = Query.prototype.submit;
Query.prototype.submit = function () {
  const text = this.text;
  console.log(text);
  submit.apply(this, arguments);
};

const db = new Pool({ connectionString });

module.exports = db;
