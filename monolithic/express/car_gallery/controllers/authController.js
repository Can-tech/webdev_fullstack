exports.login = (req, res) => {
  if (req.body.email == "admin" && req.body.password == "1234") {
    req.session.userId = "admin";
  }
  console.log("not logged In");
  res.redirect("/");
};
