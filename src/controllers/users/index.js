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
  usersModel.getDetailUsers(id, (results) => {
    if (id.length <= 0) {
      response(res, `User by id : ${id} not found`, results);
    }
    return response(res, `Success get data by id : ${id}`, results[0]);
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
  usersModel.updateUsers(id, req.body, (results) => {
    // if (results.length <= 0) {
    //   response(res, `User by id : ${id} not found`, results);
    // }
    return response(
      res,
      `Update data user id : ${id} successfully`,
      results[0]
    );
  });
};

exports.deleteUsers = (req, res) => {
  const { id } = req.params;
  usersModel.deleteUsers(id, (results) => {
    // if (results.length <= 0) {
    //   response(res, `User by id : ${id} not found`, results);
    // }
    return response(res, `user id : ${id} deleted`, results[0]);
  });
};
