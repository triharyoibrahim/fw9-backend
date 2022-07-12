const express = require("express");
const Router = express.Router();
const transactionController = require("../../controllers/transactions");
const { body } = require("express-validator");

const validation = [
  body("time")
    .isDate("YYYY-MM-DD")
    .withMessage("Please input date format YYYY-MM-DD"),
  body("amount").isNumeric().withMessage("Please input amount correctly"),
];

Router.get("/", transactionController.getAllTransaction);
Router.get("/:id", transactionController.getDetailTransaction);
Router.post("/", validation, transactionController.createTransaction);
Router.patch("/:id", validation, transactionController.updateTransaction);
Router.delete("/:id", transactionController.deleteTransaction);

module.exports = Router;
