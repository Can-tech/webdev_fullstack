const express = require("express");
const Router = express.Router();

const userController = require("../controllers/userController");

Router.route("/register").post(userController.createUser);
Router.route("/login").post(userController.loginUser);
Router.route("/logout").get(userController.logout);
Router.route("/enroll").get(userController.enrollClass);

module.exports = Router;
