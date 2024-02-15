const express = require("express");
const Router = express.Router();

const pageController = require("../controllers/pageController");

const redirectmiddleware = require("../middlewares/redirectmiddleware");
const authMiddleware = require("../middlewares/authmiddleware");

Router.route("/").get(pageController.getHomePage);
Router.route("/classes").get(pageController.getClassesPage);
Router.route("/trainer").get(pageController.getTrainerPage);
Router.route("/contact").get(pageController.getContactPage);
Router.route("/contact").post(pageController.sendEmail);
Router.route("/login").get(redirectmiddleware, pageController.getLoginPage);
Router.route("/register").get(
  redirectmiddleware,
  pageController.getRegisterPage
);
Router.route("/dashboard").get(authMiddleware, pageController.getDashboardPage);

module.exports = Router;
