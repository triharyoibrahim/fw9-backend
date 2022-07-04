const express = require("express");
const Router = express.Router();
const transactionController = require("../../controllers/transactions");
const { body } = require("express-validator");

const validationTime = [
  body("time")
    .isDate("YYYY-MM-DD")
    .withMessage("Please input date format YYYY-MM-DD"),
];

Router.get("/", transactionController.getAllTransaction);
Router.get("/:id", transactionController.getDetailTransaction);
Router.post("/", validationTime, transactionController.createTransaction);
Router.patch("/:id", validationTime, transactionController.updateTransaction);
Router.delete("/:id", transactionController.deleteTransaction);

module.exports = Router;
