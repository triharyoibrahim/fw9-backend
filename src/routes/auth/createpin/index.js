const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "create pin page",
  });
});
module.exports = Router;
