const User = require("../models/User");

module.exports = (roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.session.userId);
    if (roles.includes(user.role)) {
      next();
    } else {
      res.send("access restricted");
    }
  };
};
