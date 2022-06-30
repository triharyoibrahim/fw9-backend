const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/users");

Router.get("/", userController.getAllUsers);
Router.post("/", userController.createUsers);
Router.patch("/:id", userController.updateUsers);
Router.delete("/:id", userController.deleteUsers);

module.exports = Router;
