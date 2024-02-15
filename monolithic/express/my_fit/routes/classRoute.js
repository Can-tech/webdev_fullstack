const express = require("express");
const Router = express.Router();

const classController = require("../controllers/classController");

const rolemiddleware = require("../middlewares/rolemiddleware");

Router.route("/new").post(
  rolemiddleware(["instructor", "admin"]),
  classController.createClass
);
Router.route("/delete").get(
  rolemiddleware(["instructor", "admin"]),
  classController.deleteClass
);

module.exports = Router;
