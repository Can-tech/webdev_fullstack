const express = require("express");
const Router = express.Router();

const adminController = require("../controllers/adminController");
const pageController = require("../controllers/pageController");

Router.route("/").get(pageController.getAdminPage);
Router.route("/login").post(adminController.adminLogin);
Router.route("/logout").get(adminController.adminLogout);

module.exports = Router;
