const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const app = express();
const Router = express.Router();

const pageRouter = require("./routes/pageRoutes");
const authRouter = require("./routes/authRoutes");

const Car = require("./models/Car");

//Global variable
global.userIn = null;

//CONNECT DB
mongoose.connect("mongodb://localhost:27017/car_gallery");

//Template engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "lion",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  userIn = req.session.userId;
  next();
});

app.use("/", pageRouter);
app.use("/users", authRouter);

app.listen(3000, () => {
  console.log("server is up!");
});
