const upload = require("../helpers/upload").single("picture");
const response = require("../helpers/standardResponse");

const uploadProfile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return response(res, `Error: ${err.message}`, null, null, 400);
    }
    next();
  });
};

module.exports = uploadProfile;
