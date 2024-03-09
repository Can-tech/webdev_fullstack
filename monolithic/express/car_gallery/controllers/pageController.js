const Car = require("../models/Car");
const mongoose = require("mongoose");

exports.getHomePage = (req, res) => {
  res.render("index");
};
exports.getLoginPage = (req, res) => {
  res.render("login");
};
exports.getAdminPage = (req, res) => {
  res.render("adminPage");
};

exports.getSearchResultPage = async (req, res) => {
  console.log(req.query);
  const yearIntervals = [
    [2020, 2024],
    [2010, 2019],
    [2000, 2009],
  ];
  const priceIntervals = [
    [5000, 10000],
    [10000, 20000],
    [20000, 5000],
    [50000, 100000],
  ];
  let query = {};

  if (req.query.year && req.query?.year !== "default") {
    const yearInterval = yearIntervals[Number(req.query.year)] || [];
    query.year = { $gte: yearInterval[0], $lte: yearInterval[1] };
  }

  if (req.query.price && req.query?.price !== "default") {
    const priceInterval = priceIntervals[Number(req.query.price)] || [];
    query.price = { $gte: priceInterval[0], $lte: priceInterval[1] };
  }

  if (req.query.bodyStyle && req.query?.bodyStyle !== "default") {
    query.bodyStyle = req.query.bodyStyle;
  }

  if (req.query.make && req.query?.make !== "default") {
    query.make = req.query.make;
  }

  if (req.query.condition && req.query?.condition !== "default") {
    query.condition = req.query.condition;
  }

  if (req.query.color && req.query?.color !== "default") {
    query.color = req.query.color;
  }
  if (req.query.keywords && req.query?.keywords) {
    const keywords = req.query.keywords;
    query.$or = [
      { name: { $regex: keywords, $options: "i" } },
      { make: { $regex: keywords, $options: "i" } },
    ];
  }
  console.log(query);
  const cars = await Car.find(query);
  res.render("searchResultPage", { cars });
};
