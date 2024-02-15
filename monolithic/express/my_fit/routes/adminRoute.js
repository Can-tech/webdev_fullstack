const express = require("express");
const Router = express.Router();

const adminController = require("../controllers/adminController");

const rolemiddleware = require("../middlewares/rolemiddleware");

Router.route("/users").get(
  rolemiddleware(["admin"]),
  adminController.getAdminUsersPage
);
Router.route("/suspend").post(
  rolemiddleware(["admin"]),
  adminController.handleSuspend
);
Router.route("/instructors").get(
  rolemiddleware(["admin"]),
  adminController.getAdminInstructorsPage
);
Router.route("/newclass").get(
  rolemiddleware(["admin"]),
  adminController.getAdminNewClassPage
);
Router.route("/classes").get(
  rolemiddleware(["admin"]),
  adminController.getAdminClassesPage
);

module.exports = Router;
