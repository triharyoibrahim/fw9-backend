const response = require("../../../helpers/standardResponse");
const loginModel = require("../../../models/auth/login");
const { validationResult } = require("express-validator");

exports.login = (req, res) => {
  const { email, password } = req.body;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, "Please fill data correctly", validation.array(), 400);
  }
  console.log(req.body);
  loginModel.login(req.body, (results) => {
    return response(res, "Success get data", results);
  });
};
