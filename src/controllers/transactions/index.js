const response = require("../../helpers/standardResponse");
const transactionModel = require("../../models/transactions");
const { validationResult } = require("express-validator");
const { LIMIT_DATA } = process.env;

// exports.getAllTransaction = (req, res) => {
//   transactionModel.getAllTransaction((results) => {
//     return response(res, "Success get data", results);
//   });
// };

exports.getAllTransaction = (req, res) => {
  const {
    search = "",
    sortBy = "id",
    sorting = "ASC",
    limit = parseInt(LIMIT_DATA),
    page = 1,
  } = req.query;
  const offset = (page - 1) * limit;

  transactionModel.getAllTransaction(
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
      transactionModel.countAllTransaction(search, (err, totalData) => {
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

exports.getDetailTransaction = (req, res) => {
  const { id } = req.params;

  transactionModel.getDetailTransaction(id, (err, results) => {
    // console.log(results);
    if (results.rows.length > 0) {
      return response(res, `Success get data by id : ${id}`, results.rows[0]);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};

exports.createTransaction = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, "Please fill data correctly", validation.array(), 400);
  }
  transactionModel.createTransaction(req.body, (results) => {
    return response(res, "Transaction successfully", results[0]);
  });
};

exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const validation = validationResult(req);

  transactionModel.updateTransaction(id, req.body, (results) => {
    // console.log(results);
    if (!validation.isEmpty()) {
      return response(
        res,
        "Please fill data correctly",
        validation.array(),
        400
      );
    }

    if (results.rows.length > 0) {
      return response(
        res,
        `Update data user id : ${id} successfully`,
        results.rows[0]
      );
    } else {
      return response(res, `data user id : ${id} not found`, null, 404);
    }
  });
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;

  transactionModel.deleteTransaction(id, (results) => {
    // console.log(results);
    if (results.rows.length > 0) {
      return response(res, `Success deleted data by id : ${id}`, null);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};
