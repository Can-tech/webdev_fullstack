module.exports = (roles) => (req, res, next) => {
  if (roles.includes(req.session.userId)) {
    return next();
  }
  res.redirect("/");
};
