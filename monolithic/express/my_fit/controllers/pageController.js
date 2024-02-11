exports.getHomePage = (req, res) => {
  res.render("index", {
    page_name: "index",
  });
};
exports.getServicePage = (req, res) => {
  res.render("service", {
    page_name: "service",
  });
};
exports.getTrainerPage = (req, res) => {
  res.render("trainer", {
    page_name: "trainer",
  });
};
exports.getContactPage = (req, res) => {
  res.render("contact", {
    page_name: "contact",
  });
};
exports.getLoginPage = (req, res) => {
  res.render("login", {
    page_name: "login",
  });
};
exports.getRegisterPage = (req, res) => {
  res.render("register", {
    page_name: "register",
  });
};
