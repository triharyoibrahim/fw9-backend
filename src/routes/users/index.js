const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/users");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const authMiddleware = require("../../middleware/auth");

const validation = [
  body("email")
  .notEmpty().withMessage("Please input your email")
  .isEmail().withMessage("Please input format email correctly"),
  body("password")
    .notEmpty().withMessage("Please input your password")
    .isLength({ min: 4 })
    .withMessage("Please input password mininum 4 character")
    .customSanitizer(async (value) => {
      const hash = await bcrypt.hash(value, 10);
      return hash;
    }),
  body("username")
    .notEmpty().withMessage("Please input your username")
    .isLength({ min: 4 })
    .withMessage("Please input username mininum 4 character"),
  body("pin")
    .notEmpty().withMessage("Please input your pin")
    .isLength({ min: 6, max: 6 })
    .withMessage("Please input 6 digit pin")
    .isNumeric()
    .withMessage("Please input number only"),
];
const limit = [body("limit").toInt(), body("page").toInt()];

Router.get("/", authMiddleware, limit, userController.getAllUsers);
Router.get("/:id", authMiddleware, userController.getDetailUsers);
Router.post("/", authMiddleware, validation, userController.createUsers);
Router.patch("/:id", authMiddleware, validation, userController.updateUsers);
Router.delete("/:id", authMiddleware, userController.deleteUsers);

module.exports = Router;
