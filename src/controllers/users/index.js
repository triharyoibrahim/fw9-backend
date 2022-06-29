const response = require("../../helpers/standardResponse");
const usersModel = require("../../models/users");

exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((results) => {
    return response(res, "Success get data", results);
  });
};

exports.createUsers = (req, res) => {
  usersModel.createUsers(req.body, (results) => {
    return response(res, "Create user successfully", results);
  });
};
