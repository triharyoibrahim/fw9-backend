const express = require("express");
const Router = express.Router();

//Auth
Router.use("/login", require("./auth/login"));
Router.use("/signup", require("./auth/signup"));
Router.use("/createpin", require("./auth/createpin"));

//Home
Router.use("/home", require("../routes/home"));

//Transactions
Router.use("/topup", require("../routes/transactions/topup"));
Router.use("/transfer", require("../routes/transactions/transfer"));

//Users
Router.use("/users", require("./users"));

module.exports = Router;
