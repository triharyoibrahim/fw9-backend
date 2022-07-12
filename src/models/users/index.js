const db = require("../../helpers/db");
const { LIMIT_DATA } = process.env;

exports.getAllUsers = (
  keyword,
  sortby,
  sort,
  limit = parseInt(LIMIT_DATA),
  offset = 0,
  cb
) => {
  db.query(
    `SELECT * FROM users WHERE email LIKE \'%${keyword}%'\ ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
    [limit, offset],
    (err, res) => {
      cb(err, res.rows);
    }
  );
};

exports.countAllUsers = (keyword, cb) => {
  db.query(
    `SELECT * FROM users WHERE email LIKE \'%${keyword}%'\ `,
    (err, res) => {
      cb(err, res.rowCount);
    }
  );
};

exports.getDetailUsers = (id, cb) => {
  const q = "SELECT * FROM users WHERE id=$1";
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};

exports.getUsersByEmail = (email, cb) => {
  const q = "SELECT * FROM users WHERE email=$1";
  const val = [email];

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
    cb(err, res);
  });
};

exports.updateUsers = (id, data, cb) => {
  let val = [id];

  const filtered = {};

  const objt = {
    email: data.email,
    password: data.password,
    username: data.username,
    pin: data.pin,
  };

  for (let x in objt) {
    if (objt[x] !== null) {
      if (objt[x] !== undefined) {
        filtered[x] = objt[x];
        val.push(objt[x]);
      }
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind + 2}`);
  const q = `UPDATE users SET ${finalResult} WHERE id=$1 RETURNING *`;

  db.query(q, val, (err, res) => {
    // console.log(res);
    cb(err, res);
  });
};

exports.deleteUsers = (id, cb) => {
  const q = "DELETE FROM users WHERE id=$1 RETURNING *";
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};
