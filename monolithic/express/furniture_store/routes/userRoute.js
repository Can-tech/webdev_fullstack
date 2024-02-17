const express = require("express");
const Router = express.Router();

const userController = require("../controllers/userController");

Router.route("/register").post(userController.register);
Router.route("/login").post(userController.login);
Router.route("/logout").get(userController.logout);

module.exports = Router;
