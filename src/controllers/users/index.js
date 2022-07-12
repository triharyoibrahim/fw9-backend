const response = require("../../helpers/standardResponse");
const usersModel = require("../../models/users");
const { validationResult } = require("express-validator");
const { LIMIT_DATA } = process.env;

exports.getAllUsers = (req, res) => {
  const {
    search = "",
    sortBy = "id",
    sorting = "ASC",
    limit = parseInt(LIMIT_DATA),
    page = 1,
  } = req.query;
  const offset = (page - 1) * limit;

  usersModel.getAllUsers(
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
      usersModel.countAllUsers(search, (err, totalData) => {
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

exports.getDetailUsers = (req, res) => {
  const { id } = req.params;

  usersModel.getDetailUsers(id, (err, results) => {
    if (results.rows.length > 0) {
      return response(res, `Success get data by id : ${id}`, results.rows[0]);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};

exports.createUsers = (req, res) => {
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
  usersModel.createUsers(req.body, (err, results) => {
    return response(res, "Create user successfully", results.rows[0]);
  });
};

exports.updateUsers = (req, res) => {
  const { id } = req.params;
  const validation = validationResult(req);

  usersModel.updateUsers(id, req.body, (results) => {
    if (!validation.isEmpty()) {
      return response(
        res,
        "Please fill data correctly",
        validation.array(),
        null,
        400
      );
    }
    // console.log(results);
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

exports.deleteUsers = (req, res) => {
  const { id } = req.params;

  usersModel.deleteUsers(id, (results) => {
    if (results.rows.length > 0) {
      return response(res, `Success deleted data by id : ${id}`, null);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};
