const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/users");
const { body } = require("express-validator");

const validation = [
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
];

Router.get("/", userController.getAllUsers);
Router.get("/:id", userController.getDetailUsers);
Router.post("/", validation, userController.createUsers);
Router.patch("/:id", userController.updateUsers);
Router.delete("/:id", userController.deleteUsers);

module.exports = Router;
