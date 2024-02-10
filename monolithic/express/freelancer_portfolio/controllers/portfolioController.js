const fs = require("fs");
const Portfolio = require("../models/portfolio");

exports.createPortfolio = async (req, res) => {
  const uploadDir = "public/uploads/";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Portfolio.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
};

exports.deletePortfolio = async (req, res) => {
  const portfolio = await Portfolio.findById(req.query.id);
  let uploadPath = __dirname + "/../public/uploads/" + portfolio.name;
  if (fs.existsSync(uploadPath)) {
    fs.rmSync(uploadPath);
  }
  await Portfolio.deleteOne({ _id: req.query.id });
  res.redirect("/");
};
