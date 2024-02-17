const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    console.log("here");
    const user = await User.create(req.body);
    res.render("/furnitures");
  } catch (err) {
    res.send(err);
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, valid) => {
      if (err) {
        res.send("Passwords do not match");
      }
      req.session.userId = user._id;
      res.redirect("/");
    });
  } else {
    res.send("no such a user");
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
