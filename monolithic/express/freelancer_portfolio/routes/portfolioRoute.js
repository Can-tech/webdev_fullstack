const express = require("express");
const Router = express.Router();
const portfolioController = require("../controllers/portfolioController");

Router.route("/new").post(portfolioController.createPortfolio);
Router.route("/delete").get(portfolioController.deletePortfolio);

module.exports = Router;
