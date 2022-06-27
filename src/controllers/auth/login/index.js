const login = require("express").Router();

login.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "this is login",
  });
});
