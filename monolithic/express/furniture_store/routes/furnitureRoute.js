const express = require("express");
const Router = express.Router();

const furnitureController = require("../controllers/furnitureController");

Router.route("/new").post(furnitureController.createFurniture);
Router.route("/delete").post(furnitureController.deleteFurniture);
Router.route("/:parentCategory/:childCategory").get(
  furnitureController.getFurnituresByCategoryPage
);
Router.route("/:parentCategory").get(furnitureController.getChildCategories);
Router.route("/reserve").post(furnitureController.reserveFurniture);

module.exports = Router;
