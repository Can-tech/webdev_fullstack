const User = require("../models/User");
const Furniture = require("../models/Furniture");
const Category = require("../models/Category");

exports.getHomePage = (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    res.send(err);
  }
};
exports.getAboutPage = (req, res) => {
  try {
    res.render("about");
  } catch (err) {
    res.send(err);
  }
};
exports.getContactPage = (req, res) => {
  try {
    res.render("contact");
  } catch (err) {
    res.send(err);
  }
};
exports.getFurnituresPage = (req, res) => {
  try {
    res.render("furnitures");
  } catch (err) {
    res.send(err);
  }
};
exports.getRegisterPage = (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    res.send(err);
  }
};
exports.getLoginPage = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.send(err);
  }
};

exports.getDashboardPage = async (req, res) => {
  //   console.log(user);
  try {
    const user = await User.findById(req.session.userId);
    res.render("dashboard", {
      user,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.getAdminFurnituresPage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const categories = await Category.find({});
  const childCategories = categories.filter((e) => e.parentCategory);
  //   const childCategories = categories.filter((e) => !e.parentCategory);
  const furnitures = await Furniture.find({});
  try {
    res.render("adminFurnitures", {
      user,
      childCategories,
      furnitures,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.getAdminCategoriesPage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const categories = await Category.find({});
  //   console.log(user);
  try {
    res.render("adminCategories", {
      user,
      categories,
    });
  } catch (err) {
    res.send(err);
  }
};
