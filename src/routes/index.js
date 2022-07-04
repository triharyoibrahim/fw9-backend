const express = require("express");
const Router = express.Router();

//Auth
Router.use("/login", require("./auth/login"));
Router.use("/signup", require("./auth/signup"));

//Home
Router.use("/home", require("../routes/home"));

//Transactions
Router.use("/transaction", require("../routes/transactions"));

//Users
Router.use("/users", require("./users"));

//Profile
Router.use("/profile", require("./profile"));

module.exports = Router;
