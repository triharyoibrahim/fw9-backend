const express = require("express");
const Router = express.Router();
const { body } = require("express-validator");
const transferController = require("../../controllers/transfer");
const authMiddleware = require("../../middleware/auth");

const validation =[
    body('amount').isNumeric().withMessage('Please input amount')
      .notEmpty().isInt({min:1}).withMessage('Wrong input amount'),
  ];
Router.post("/", authMiddleware, validation, transferController.createTransfer);

module.exports = Router;
