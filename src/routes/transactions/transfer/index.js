const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "transfer page",
  });
});
module.exports = Router;
