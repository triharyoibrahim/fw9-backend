const express = require("express");
const Router = express.Router();
const transferController = require("../../../controllers/transactions/transfer");

Router.get("/", transferController.getTransfer);
module.exports = Router;
