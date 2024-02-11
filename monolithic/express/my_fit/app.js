const ejs = require("ejs");
const express = require("express");
const app = express();

const pageRouter = require("./routes/pageRoute");

//View engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
// app.use((req, res, next) => {
//   const path = req.path;
//   console.log(path);
//   next();
// });
//Routes
app.use("/", pageRouter);

app.listen(3000, () => {
  console.log("server is up");
});
