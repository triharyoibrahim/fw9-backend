const response = require("../../helpers/standardResponse");
const usersModel = require("../../models/users");
const { validationResult } = require("express-validator");

exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((results) => {
    return response(res, "Success get data", results);
  });
};

exports.getDetailUsers = (req, res) => {
  const { id } = req.params;

  usersModel.getDetailUsers(id, (err, results) => {
    if (results.rows.length > 0) {
      return response(res, `Success get data by id : ${id}`, results.rows[0]);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};

exports.createUsers = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, "Please fill data correctly", validation.array(), 400);
  }
  usersModel.createUsers(req.body, (results) => {
    return response(res, "Create user successfully", results[0]);
  });
};

exports.updateUsers = (req, res) => {
  const { id } = req.params;
  const validation = validationResult(req);

  usersModel.updateUsers(id, req.body, (results) => {
    if (!validation.isEmpty()) {
      return response(
        res,
        "Please fill data correctly",
        validation.array(),
        400
      );
    }
    // console.log(results);
    if (results.length > 0) {
      return response(
        res,
        `Update data user id : ${id} successfully`,
        results[0]
      );
    } else {
      return response(res, `data user id : ${id} not found`, null, 404);
    }
  });
};

exports.deleteUsers = (req, res) => {
  const { id } = req.params;

  usersModel.deleteUsers(id, (results) => {
    if (results.rows.length > 0) {
      return response(res, `Success deleted data by id : ${id}`, null);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};
