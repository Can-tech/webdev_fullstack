const express = require("express");
const Router = express.Router();

const pageController = require("../controllers/pageController");

const roleCheckMiddleware = require("../middlewares/roleCheckMiddleware");

Router.route("/").get(pageController.getHomePage);
Router.route("/search").get(pageController.getSearchResultPage);
Router.route("/login").get(pageController.getLoginPage);
Router.route("/panel").get(
  roleCheckMiddleware(["admin", "user"]),
  pageController.getAdminPage
);

module.exports = Router;
