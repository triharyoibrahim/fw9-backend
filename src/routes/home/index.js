const express = require("express");
const Router = express.Router();
const homeController = require("../../controllers/home");
const authMiddleware = require("../../middleware/auth");

Router.get("/", authMiddleware, homeController.getHome);
module.exports = Router;
