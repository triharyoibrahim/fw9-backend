const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/users");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const validation = [
  body("email").isEmail().withMessage("Please input format email correctly"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Please input password mininum 4 character")
    .customSanitizer(async (value) => {
      const hash = await bcrypt.hash(value, 10);
      return hash;
    }),
  body("username")
    .isLength({ min: 4 })
    .withMessage("Please input username mininum 4 character"),
  body("pin")
    .isLength({ min: 6, max: 6 })
    .withMessage("Please input 6 digit pin")
    .isNumeric()
    .withMessage("Please input number only"),
];
const limit = [body("limit").toInt(), body("page").toInt()];

Router.get("/", limit, userController.getAllUsers);
Router.get("/:id", userController.getDetailUsers);
Router.post("/", validation, userController.createUsers);
Router.patch("/:id", validation, userController.updateUsers);
Router.delete("/:id", userController.deleteUsers);

module.exports = Router;
