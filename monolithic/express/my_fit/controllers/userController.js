const bcrypt = require("bcrypt");
const User = require("../models/User");
const Class = require("../models/Class");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          req.session.userId = user._id;
          res.redirect("/");
        } else {
          res.send("1.err " + err);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send("2.    " + err);
  }
};

exports.logout = (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (err) {}
};

exports.enrollClass = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const foundClass = await Class.findById(String(req.query.id));
    user.enrolled_classes.push(foundClass._id);
    await user.save();
    res.redirect("/classes");
  } catch (err) {
    res.send(err);
  }
};
