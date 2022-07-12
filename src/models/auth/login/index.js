const db = require("../../../helpers/db");

exports.login = (data, cb) => {
  const q = "SELECT * FROM users WHERE email = $1 RETURNING *";
  const val = [data.email];
  // console.log(val);
  db.query(q, val, (err, res) => {
    cb(res);
  });
};
