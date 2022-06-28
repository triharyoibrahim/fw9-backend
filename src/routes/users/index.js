const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/users");

Router.get("/", userController.getAllUsers);
module.exports = Router;
