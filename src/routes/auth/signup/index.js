const express = require("express");
const Router = express.Router();
const signupController = require("../../../controllers/auth/signup");

Router.get("/", signupController.getSignUp);
module.exports = Router;
