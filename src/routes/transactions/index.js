const express = require("express");
const Router = express.Router();
const transactionController = require("../../controllers/transactions");
const { body } = require("express-validator");
const authMiddleware = require("../../middleware/auth");

const validation = [
  body("time")
    .notEmpty().withMessage("Please input time")
    .isDate("YYYY-MM-DD")
    .withMessage("Please input date format YYYY-MM-DD"),
  body("amount")
  .notEmpty().withMessage("Please input amount")
  .isNumeric().withMessage("Please input amount correctly"),
];

Router.get("/", authMiddleware, transactionController.getAllTransaction);
Router.get("/:id", authMiddleware, transactionController.getDetailTransaction);
Router.post("/", validation, transactionController.createTransaction);
Router.patch("/:id", validation, transactionController.updateTransaction);
Router.delete("/:id", transactionController.deleteTransaction);

module.exports = Router;
