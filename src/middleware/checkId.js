const response = require("../helpers/standardResponse");
const profileModel = require("../models/profile");

const checkId = (req, res, next) => {
  const { id } = req.params;

  profileModel.getDetailProfile(id, (err, results) => {
    // console.log(results);
    if (results.rows.length <= 0) {
      return response(res, `data by id : ${id} not found`, null, 404);
    } else {
      next();
    }
  });
};

module.exports = checkId;
