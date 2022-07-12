const express = require("express");
const Router = express.Router();
const loginController = require("../../../controllers/auth/login");
const { body } = require("express-validator");

const validation = [
  body("email").isEmail().withMessage("Please input format email correctly"),
];

Router.post("/", validation, loginController.login);
module.exports = Router;
