const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  if (user) {
    return next();
  }
  return res.redirect("/login");
};
