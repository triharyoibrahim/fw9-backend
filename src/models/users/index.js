const db = require("../../helpers/db");

exports.getAllUsers = (cb) => {
  db.query("SELECT * FROM users", (err, res) => {
    cb(res.rows);
  });
};

exports.getDetailUsers = (id, cb) => {
  const q = "SELECT * FROM users WHERE id=$1";
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};

exports.createUsers = (data, cb) => {
  const q =
    "INSERT INTO users (email, password, username, pin) VALUES ($1, $2, $3, $4) RETURNING *";
  const val = [data.email, data.password, data.username, data.pin];
  db.query(q, val, (err, res) => {
    // console.log(res);
    cb(res.rows);
  });
};

exports.updateUsers = (id, data, cb) => {
  const q =
    "UPDATE users SET email=$1, password =$2, username=$3, pin=$4 WHERE id=$5 RETURNING *";
  const val = [data.email, data.password, data.username, data.pin, id];

  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};

exports.deleteUsers = (id, cb) => {
  const q = "DELETE FROM users WHERE id=$1 RETURNING *";
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(res);
  });
};
