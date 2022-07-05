const response = require("../../helpers/standardResponse");
const profileModel = require("../../models/profile");
const { validationResult } = require("express-validator");

exports.getAllProfile = (req, res) => {
  const { search = "" } = req.query;
  profileModel.getAllProfile(search, (err, results) => {
    return response(res, "Success get data", results);
  });
};

exports.getDetailProfile = (req, res) => {
  const { id } = req.params;

  profileModel.getDetailProfile(id, (results) => {
    // console.log(results);
    if (results.length > 0) {
      return response(res, `Success get data by id : ${id}`, results[0]);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};

exports.createProfile = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, "Please fill data correctly", validation.array(), 400);
  }
  profileModel.createProfile(req.body, (results) => {
    // console.log(req.body);
    return response(res, "Create profile successfully", results.rows[0]);
  });
};

exports.updateProfile = (req, res) => {
  const { id } = req.params;
  const validation = validationResult(req);

  profileModel.updateProfile(id, req.body, (results) => {
    if (!validation.isEmpty()) {
      return response(
        res,
        "Please fill data correctly",
        validation.array(),
        400
      );
    }
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

exports.deleteProfile = (req, res) => {
  const { id } = req.params;
  profileModel.deleteProfile(id, (results) => {
    if (results.rows.length > 0) {
      return response(res, `Success deleted data by id : ${id}`, null);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};
