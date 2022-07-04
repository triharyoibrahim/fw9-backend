const express = require("express");
const Router = express.Router();
const profileController = require("../../controllers/profile");
const { body } = require("express-validator");

const validation = [
  body("phonenumber")
    .isLength({ min: 11 })
    .withMessage("Please input phone number correctly (min 11 digit)"),
];

Router.get("/", profileController.getAllProfile);
Router.get("/:id", profileController.getDetailProfile);
Router.post("/", validation, profileController.createProfile);
Router.patch("/:id", validation, profileController.updateProfile);
Router.delete("/:id", profileController.deleteProfile);

module.exports = Router;
