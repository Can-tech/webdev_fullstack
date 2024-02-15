const userSession = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const ejs = require("ejs");
const express = require("express");
const app = express();

const pageRoute = require("./routes/pageRoute");
const userRoute = require("./routes/userRoute");
const classRoute = require("./routes/classRoute");
const adminRoute = require("./routes/adminRoute");
const session = require("express-session");

//CONNECT DB
mongoose.connect("mongodb://localhost:27017/my_fit").then(() => {
  console.log("db is connected");
});

//GLOBALS
global.userIn = null;

//View engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      client: mongoose.connection
        ? mongoose.connection.getClient()
        : "mongodb://localhost:27017/my_fit",
    }),
  })
);
app.use((req, res, next) => {
  userIn = req.session.userId;
  // console.log(userIn);
  next();
});

//Routes
app.use("/", pageRoute);
app.use("/users", userRoute);
app.use("/classes", classRoute);
app.use("/admin", adminRoute);

app.listen(3000, () => {
  console.log("server is up");
});
