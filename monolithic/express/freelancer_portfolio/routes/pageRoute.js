const express = require("express");
const Router = express.Router();

const pageController = require("../controllers/pageController");

Router.route("/").get(pageController.getHomePage);
Router.route("/about").get(pageController.getAboutPage);

module.exports = Router;
