const db = require("../../helpers/db");

exports.createTransfer = (data, cb) => {
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
      cb(err, res);
    });
  };
  