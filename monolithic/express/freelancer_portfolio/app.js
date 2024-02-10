const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const ejs = require("ejs");
var session = require("express-session");
const Router = express.Router();
require("dotenv").config();

const pageRoute = require("./routes/pageRoute.js");
const portfolioRoute = require("./routes/portfolioRoute.js");
const adminRoute = require("./routes/adminRoute.js");

//Globals
global.userIn = "null";

//Connect DB
mongoose
  .connect("mongodb://localhost:27017/freelancerPortfolio")
  .then((e) => console.log("DB connected"));

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  session({
    secret: "keyboard dog",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  userIn = req.session.userId;
  // console.log(userIn);
  next();
});

//Template engine
app.set("view engine", "ejs");

app.use("/admin", adminRoute);
app.use("/portfolio", portfolioRoute);
app.use("/", pageRoute);

app.listen(3000, () => {
  console.log("the server is running");
});
