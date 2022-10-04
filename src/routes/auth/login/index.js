const express = require("express");
const Router = express.Router();
const loginController = require("../../../controllers/auth/login");
const { body } = require("express-validator");

const validation = [
  body("email")
  .notEmpty().withMessage("Please input your email")
  .isEmail().withMessage("Please input format email correctly"),
  body("password")
  .notEmpty().withMessage("Please input your password")
];

Router.post("/login", validation, loginController.login);
module.exports = Router;
