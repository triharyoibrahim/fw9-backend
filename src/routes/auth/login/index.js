const express = require("express");
const Router = express.Router();
const loginController = require("../../../controllers/auth/login");

Router.get("/", loginController.getLogin);
module.exports = Router;
