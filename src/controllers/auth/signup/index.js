const userModel = require("../../../models/users");
const response = require("../../../helpers/standardResponse");
const { validationResult } = require("express-validator");

exports.SignUp = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(
      res,
      "Please fill data correctly",
      validation.array(),
      null,
      400
    );
  }
  req.body.pin = null;
  userModel.createUsers(req.body, (err, results) => {
    // console.log(err);
    return response(res, "Sign Up successfully");
  });
};
