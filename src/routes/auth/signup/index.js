const express = require("express");
const Router = express.Router();
const signupController = require("../../../controllers/auth/signup");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const validation = [
  body("email")
  .isEmail().withMessage("Please input format email correctly")
  .normalizeEmail()
  .notEmpty().withMessage("Please input your email"),
  body("password")
    .notEmpty().withMessage("Please input your password")
    .isLength({ min: 4 })
    .withMessage("Please input password mininum 4 character")
    .customSanitizer(async (value) => {
      const hash = await bcrypt.hash(value, 10);
      return hash;
    }),

  body("username")
    .isLength({ min: 4 })
    .withMessage("Please input username mininum 4 character")
    .notEmpty().withMessage("Please input your username"),
];
Router.post("/signup", validation, signupController.SignUp);

module.exports = Router;
