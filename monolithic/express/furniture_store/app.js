const express = require("express");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const app = express();
const User = require("./models/User");
//Routes
const pageRoute = require("./routes/pageRoute");
const userRoute = require("./routes/userRoute");
const furnitureRoute = require("./routes/furnitureRoute");
const categoryRoute = require("./routes/categoryRoute");
const mongoose = require("mongoose");
const Category = require("./models/Category");

//connect DB
mongoose.connect("mongodb://localhost:27017/furnitureShop");

//GLOBALS
global.path = "";
global.userIn = null;

//View Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload()); //default opts
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(
      mongoose.connection
        ? { client: mongoose.connection.getClient() }
        : { mongoUrl: "mongodb://localhost:27017/furnitureShop" }
    ),
  })
);
app.use(async (req, res, next) => {
  //   const user = await User.findById(req.session.userId);
  global.path = req.path;
  global.userIn = req.session.userId;
  //   console.log(user);
  next();
});

app.use("/", pageRoute);
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/furnitures", furnitureRoute);

app.listen(3000, () => {
  console.log("server is up!");
});
