const User = require("../models/User");

module.exports = (roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.session.userId);
    if (!user) {
      res.send("Authorization is not succeeded!");
    } else {
      if (!roles.includes(user.role)) {
        res.send("Authorization is not succeeded!");
      } else {
        next();
      }
    }
  };
};
