const express = require("express");
const Router = express.Router();

const pageController = require("../controllers/pageController");

Router.route("/").get(pageController.getHomePage);
Router.route("/service").get(pageController.getServicePage);
Router.route("/trainer").get(pageController.getTrainerPage);
Router.route("/contact").get(pageController.getContactPage);
Router.route("/login").get(pageController.getLoginPage);
Router.route("/register").get(pageController.getRegisterPage);

module.exports = Router;
