const response = require("../../helpers/standardResponse");
const profileModel = require("../../models/profile");
const { validationResult } = require("express-validator");
const { LIMIT_DATA } = process.env;

exports.getAllProfile = (req, res) => {
  // console.log(res);
  const {
    search = "",
    sortBy = "id",
    sorting = "ASC",
    limit = parseInt(LIMIT_DATA),
    page = 1,
  } = req.query;
  const offset = (page - 1) * limit;

  profileModel.getAllProfile(
    search,
    sortBy,
    sorting,
    limit,
    offset,
    (err, results) => {
      // console.log(err);
      if (results.length < 1) {
        return response(res, "Data not found", null, 404);
      }
      const pageInfo = {};
      profileModel.countAllProfile(search, (err, totalData) => {
        pageInfo.totalData = totalData;
        pageInfo.totalPage = Math.ceil(totalData / limit);
        pageInfo.currentPage = page;
        pageInfo.nextPage =
          pageInfo.currentPage < pageInfo.totalPage
            ? pageInfo.currentPage + 1
            : null;
        pageInfo.previousPage =
          pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;

        return response(res, "List all data", results, pageInfo);
      });
    }
  );
};

exports.getDetailProfile = (req, res) => {
  const { id } = req.params;

  profileModel.getDetailProfile(id, (err, results) => {
    console.log(results);
    if (results.length > 0) {
      return response(res, `Success get data by id : ${id}`, results.rows);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};

exports.createProfile = (req, res) => {
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
  profileModel.createProfile(req.body, (results) => {
    // console.log(req.body);
    return response(res, "Create profile successfully", results.rows[0]);
  });
};

exports.updateProfile = (req, res) => {
  const { id } = req.params;

  let filename = null;

  if (req.file) {
    filename = req.file.filename;
  }
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

  profileModel.updateProfile(id, filename, req.body, (err, results) => {
    if (err) {
      return errorResponse(
        res,
        `Failed to update: ${err.message}, null, null, 400`
      );
    } else {
      return response(res, "Profile updated successfully", results.rows[0]);
    }
  });
};

exports.deleteProfile = (req, res) => {
  const { id } = req.params;
  profileModel.deleteProfile(id, (err, results) => {
    if (results.rows.length > 0) {
      return response(res, `Success deleted data by id : ${id}`, null);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};
