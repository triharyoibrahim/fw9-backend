const express = require("express");
const Router = express.Router();

//Auth
Router.use("/auth/", require("./auth/login"));
Router.use("/auth/", require("./auth/signup"));
Router.use("/auth/", require("./auth/createpin"));

//Home
Router.use("/home", require("../routes/home"));

//Transactions
Router.use("/transaction", require("../routes/transactions"));

//Users
Router.use("/users", require("./users"));

//Profile
Router.use("/profile", require("./profile"));

//Transfer
Router.use("/transfer", require("./transfer"));

module.exports = Router;
