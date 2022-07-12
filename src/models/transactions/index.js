const db = require("../../helpers/db");
const { LIMIT_DATA } = process.env;

exports.getAllTransaction = (
  keyword,
  sortby,
  sort,
  limit = parseInt(LIMIT_DATA),
  offset = 0,
  cb
) => {
  db.query(
    `SELECT * FROM transaction WHERE notes LIKE \'%${keyword}%'\ ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
    [limit, offset],
    (err, res) => {
      console.log(err);
      cb(err, res.rows);
    }
  );
};

exports.countAllTransaction = (keyword, cb) => {
  db.query(
    `SELECT * FROM transaction WHERE notes LIKE \'%${keyword}%'\ `,
    (err, res) => {
      cb(err, res.rowCount);
    }
  );
};

exports.getDetailTransaction = (id, cb) => {
  const q = "SELECT * FROM transaction WHERE id=$1";
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};

exports.createTransaction = (data, cb) => {
  const q =
    "INSERT INTO transaction(amount, recipient_id, sender_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const val = [
    data.amount,
    data.recipient_id,
    data.sender_id,
    data.notes,
    data.time,
    data.type_id,
  ];
  db.query(q, val, (err, res) => {
    // console.log(res);
    cb(res.rows);
  });
};

exports.updateTransaction = (id, data, cb) => {
  const q =
    "UPDATE transaction SET amount=$1, recipient_id=$2, sender_id=$3, notes=$4, time=$5, type_id=$6 WHERE id=$7 RETURNING *";
  const val = [
    data.amount,
    data.recipient_id,
    data.sender_id,
    data.notes,
    data.time,
    data.type_id,
    id,
  ];
  db.query(q, val, (err, res) => {
    cb(res);
  });
};

exports.deleteTransaction = (id, cb) => {
  const q = "DELETE FROM transaction WHERE id=$1 RETURNING *";
  const val = [id];
  db.query(q, val, (err, res) => {
    cb(res);
  });
};
