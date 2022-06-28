const express = require("express");
const Router = express.Router();
const createpinController = require("../../../controllers/auth/createpin");

Router.get("/", createpinController.getCreatePin);
module.exports = Router;
