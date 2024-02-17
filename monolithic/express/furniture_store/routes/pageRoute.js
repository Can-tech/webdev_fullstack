const express = require("express");
const Router = express.Router();

const pageController = require("../controllers/pageController");

const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

Router.route("/").get(pageController.getHomePage);
Router.route("/about").get(pageController.getAboutPage);
Router.route("/contact").get(pageController.getContactPage);
Router.route("/furnitures").get(pageController.getFurnituresPage);
Router.route("/login").get(redirectMiddleware, pageController.getLoginPage);
Router.route("/register").get(
  redirectMiddleware,
  pageController.getRegisterPage
);
Router.route("/dashboard").get(authMiddleware, pageController.getDashboardPage);
Router.route("/admin/furnitures").get(
  roleMiddleware(["admin"]),
  pageController.getAdminFurnituresPage
);
Router.route("/admin/categories").get(
  roleMiddleware(["admin"]),
  pageController.getAdminCategoriesPage
);

module.exports = Router;
