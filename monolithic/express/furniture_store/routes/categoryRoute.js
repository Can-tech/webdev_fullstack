const express = require("express");
const Router = express.Router();

const categoryController = require("../controllers/categoryController");

Router.route("/new").post(categoryController.createCategory);

module.exports = Router;
