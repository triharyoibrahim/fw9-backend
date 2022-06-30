const response = require("../../helpers/standardResponse");
const usersModel = require("../../models/users");

exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((results) => {
    return response(res, "Success get data", results);
  });
};

exports.createUsers = (req, res) => {
  usersModel.createUsers(req.body, (results) => {
    return response(res, "Create user successfully", results[0]);
  });
};

exports.updateUsers = (req, res) => {
  const { id } = req.params;
  usersModel.updateUsers(id, req.body, (results) => {
    return response(res, "Update data user successfully", results[0]);
  });
};

exports.deleteUsers = (req, res) => {
  const { id } = req.params;
  usersModel.deleteUsers(id, (results) => {
    return response(res, `user ${id} deleted`, results[0]);
  });
};
