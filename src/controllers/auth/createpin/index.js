const userModel = require("../../../models/users");
const response = require("../../../helpers/standardResponse");
const { validationResult } = require("express-validator");

exports.createPin = (req, res) => {
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
  const { email } = req.body;
  userModel.getUsersByEmail(email, (err, results) => {
    if (results.rows.length > 0) {
      const user = results.rows[0];
      if (user.pin === null) {
        userModel.updateUsers(
          user.id,
          { pin: req.body.pin },
          (err, resultUpdate) => {
            const userUpdate = resultUpdate.rows[0];
            if (userUpdate.email === user.email) {
              return response(res, "Create Pin Success");
            }
          }
        );
      } else {
        return response(res, "Error: pin already set", null, null, 400);
      }
    } else {
      return response(res, "Error: Email does not exists", null, null, 400);
    }
  });
};
