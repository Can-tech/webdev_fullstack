const express = require("express");
const Router = express.Router();

const authController = require("../controllers/authController");

Router.route("/login").post(authController.login);

module.exports = Router;
