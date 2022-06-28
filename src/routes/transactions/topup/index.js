const express = require("express");
const Router = express.Router();
const topupController = require("../../../controllers/transactions/topup");

Router.get("/", topupController.getTopUp);
module.exports = Router;
