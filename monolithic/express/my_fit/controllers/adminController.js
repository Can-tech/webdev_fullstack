const User = require("../models/User");
const Class = require("../models/Class");

exports.getAdminUsersPage = async (req, res) => {
  const pageQuery = req.query?.page || 1;
  const userSearchQuery = decodeURIComponent(req.query.email);
  const searchQueryUser = await User.findOne({
    email: userSearchQuery,
  }).populate("enrolled_classes");
  const itemsPerPage = 3;
  const usersCount = await User.find({ role: "user" }).countDocuments();
  const users = await User.find({ role: "user" })
    .skip((pageQuery - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .populate("enrolled_classes");
  const user = await User.findById(req.session.userId);
  res.render("adminUsers", {
    users,
    user,
    page_name: "adminUsers",
    currentPage: pageQuery,
    pagesCount: Math.ceil(usersCount / itemsPerPage),
    itemsPerPage,
    searchQueryUser,
  });
};

exports.handleSuspend = async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    user.isSuspended = !user.isSuspended;
    await user.save();
    res.redirect("/admin/instructors");
  } catch (err) {
    res.send(err);
  }
};

exports.getAdminInstructorsPage = async (req, res) => {
  const pageQuery = req.query?.page || 1;
  const userSearchQuery = decodeURIComponent(req.query.email);
  const searchQueryUser = await User.findOne({
    email: userSearchQuery,
  });
  const itemsPerPage = 3;
  const usersCount = await User.find({ role: "instructor" }).countDocuments();
  const users = await User.find({ role: "instructor" })
    .skip((pageQuery - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .populate("enrolled_classes");

  // console.log("pagecount: ", Math.ceil(usersCount / itemsPerPage));
  // console.log("usrecount: ", usersCount);
  const user = await User.findById(req.session.userId);
  const classes = await Class.find({});
  // console.log(classes.map((e) => e.instructor).join(", "));
  // console.log(console.log(users));
  res.render("adminInstructors", {
    users,
    user,
    page_name: "adminInstructors",
    currentPage: pageQuery,
    pagesCount: Math.ceil(usersCount / itemsPerPage),
    itemsPerPage,
    searchQueryUser,
    classes,
  });
};

exports.getAdminNewClassPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render("adminNewClass", {
      page_name: "adminNewClass",
      user,
    });
  } catch (err) {}
};

exports.getAdminClassesPage = async (req, res) => {
  try {
    const classes = await Class.find({});
    const user = await User.findById(req.session.userId);
    res.render("adminClasses", {
      page_name: "adminClasses",
      user,
      classes,
    });
  } catch (err) {}
};
