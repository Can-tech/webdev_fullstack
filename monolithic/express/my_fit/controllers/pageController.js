const User = require("../models/User");
const Class = require("../models/Class");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.getHomePage = (req, res) => {
  res.render("index", {
    page_name: "index",
  });
};
exports.getClassesPage = async (req, res) => {
  try {
    const classes = await Class.find({});
    const user = await User.findById(req.session.userId);

    res.render("classes", {
      page_name: "classes",
      classes,
      user,
    });
  } catch (err) {
    res.send(err);
  }
};
exports.getTrainerPage = async (req, res) => {
  const instructors = await User.find({ role: "instructor" });
  res.render("trainer", {
    page_name: "trainer",
    instructors,
  });
};
exports.getContactPage = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("contact", {
    page_name: "contact",
    user,
  });
};
exports.sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Form message 👻" <ahia2089@gmail.com>', // sender address
    to: "atticusfortunata@gmail.com", // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.message, // plain text body
    html: `
    <h2>Message from my form</h2>
    Email:${req.body.email} 
    <h4>Message</h4>
    <P>${req.body.message}</p>
    `, // html body
  });
  console.log("Message sent: %s", info.messageId);
  res.redirect("/");
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

exports.getDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userId).populate(
    "enrolled_classes"
  );
  if (user?.role == "instructor") {
    const classes = await Class.find({ instructor: req.session.userId });
    res.render("dashboard", {
      page_name: "dashboard",
      user,
      classes,
    });
  } else if (user?.role == "user") {
    res.render("dashboard", {
      page_name: "dashboard",
      user,
    });
  } else if (user?.role == "admin") {
    const allClasses = await Class.find({});
    const allUsers = await User.find({});
    res.render("dashboard", {
      page_name: "dashboard",
      user,
      classes: allClasses,
    });
  }
};
