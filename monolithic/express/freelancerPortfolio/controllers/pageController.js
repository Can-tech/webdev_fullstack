const Portfolio = require("../models/portfolio");

exports.getHomePage = async (req, res) => {
  const allPortfolio = await Portfolio.find({});
  res.render("index", {
    allPortfolio,
  });
};

exports.getAdminPage = async (req, res) => {
  const allPortfolio = await Portfolio.find({});
  res.render("admin", {
    allPortfolio,
  });
};
exports.getAboutPage = (req, res) => {
  res.render("about");
};
