const response = require("../../helpers/standardResponse");
const usersModel = require("../../models/users");

exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((results) => {
    return response(res, "message from standard response", results);
  });
};
