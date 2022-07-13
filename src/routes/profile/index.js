const express = require("express");
const Router = express.Router();
const profileController = require("../../controllers/profile");
const { body } = require("express-validator");
const uploadProfile = require("../../middleware/uploadProfile");
const checkId = require("../../middleware/checkId");
const authMiddleware = require("../../middleware/auth");

const validation = [
  body("phonenumber")
    .isLength({ min: 11 })
    .withMessage("Please input phone number correctly (min 11 digit)")
    .isNumeric()
    .withMessage("Please input number only"),
  body("fullname")
    .isLength({ min: 2 })
    .withMessage("Please input your fullname correctly"),
];

Router.get("/", profileController.getAllProfile);
Router.get("/:id", authMiddleware, profileController.getDetailProfile);
Router.post("/", validation, profileController.createProfile);
Router.patch("/:id", checkId, validation, profileController.updateProfile);
Router.delete("/:id", profileController.deleteProfile);

module.exports = Router;
