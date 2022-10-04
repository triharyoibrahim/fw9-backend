const express = require("express");
const Router = express.Router();
const createPinController = require("../../../controllers/auth/createpin");
const { body } = require("express-validator");
const authMiddleware = require("../../../middleware/auth");

const validation = [
  body("email")
  .notEmpty().withMessage("Please input your pin")
  .isEmail().withMessage("Please input format email correctly"),
  body("pin")
    .notEmpty().withMessage("Please input your pin")
    .isLength({ min: 6, max: 6 })
    .withMessage("Please input pin 6 digit")
    .isNumeric()
    .withMessage("Please input number"),
];

Router.post(
  "/createpin",
  authMiddleware,
  validation,
  createPinController.createPin
);
module.exports = Router;
