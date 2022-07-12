const db = require("../../helpers/db");
const { LIMIT_DATA } = process.env;

exports.getAllProfile = (
  keyword,
  sortby,
  sort,
  limit = parseInt(LIMIT_DATA),
  offset = 0,
  cb
) => {
  db.query(
    `SELECT * FROM profile WHERE fullname LIKE \'%${keyword}%'\ ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
    [limit, offset],
    (err, res) => {
      // console.log(err);
      cb(err, res.rows);
    }
  );
};

exports.countAllProfile = (keyword, cb) => {
  db.query(
    `SELECT * FROM profile WHERE fullname LIKE \'%${keyword}%'\ `,
    (err, res) => {
      cb(err, res.rowCount);
    }
  );
};

exports.getDetailProfile = (id, cb) => {
  const q = "SELECT * FROM profile WHERE id=$1";
  const val = [id];

  db.query(q, val, (err, res) => {
    // console.log(err);
    cb(err, res);
  });
};

exports.createProfile = (data, cb) => {
  //   console.log(data);
  const q =
    "INSERT INTO profile (fullname, phonenumber, balance, picture) VALUES ($1, $2, $3, $4) RETURNING *";
  const val = [data.fullname, data.phonenumber, data.balance, data.picture];

  db.query(q, val, (err, res) => {
    cb(res);
  });
};

exports.updateProfile = (id, picture, data, cb) => {
  console.log();
  let val = [id];

  const filtered = {};

  const objt = {
    picture,
    fullname: data.fullname,
    phonenumber: data.phonenumber,
    balance: data.balance,
  };

  for (let x in objt) {
    if (objt[x] !== null) {
      filtered[x] = objt[x];
      val.push(objt[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind + 2}`);

  const q = `UPDATE profile SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res);
    } else {
      cb(err, res);
    }
  });
};

exports.deleteProfile = (id, cb) => {
  const q = "DELETE FROM profile WHERE id=$1 RETURNING *";
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};
