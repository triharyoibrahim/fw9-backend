const response = require("../../../helpers/standardResponse");
const loginModel = require("../../../models/auth/login");
const userModel = require("../../../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
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
  const { email, password } = req.body;
  userModel.getUsersByEmail(email, (err, results) => {
    if (results.rows.length < 1) {
      return response(res, "User not found", null, null, 400);
    }
    const user = results.rows[0];
    bcrypt
      .compare(password, user.password)
      .then((cpRes) => {
        // console.log(cpRes);
        if (cpRes) {
          const token = jwt.sign(
            { id: user.id },
            process.env.APP_SECRET || "BEzwallet"
          );
          return response(res, "Login success", { token });
        }
        return response(res, "Email or Password not match", null, null, 400);
      })
      .catch(() => {
        return response(res, "Email or Password not match", null, null, 400);
      });
  });
};
