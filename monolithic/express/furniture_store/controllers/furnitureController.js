const Category = require("../models/Category");
const Furniture = require("../models/Furniture");
const User = require("../models/User");

exports.createFurniture = async (req, res) => {
  try {
    let uploadedFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    uploadedFile = req.files.image;
    uploadPath = __dirname + "/../public/uploads/" + uploadedFile.name;
    uploadedFile.mv(uploadPath, async function (err) {
      if (err) return res.status(500).send(err);
      await Furniture.create({
        ...req.body,
        image: uploadedFile.name,
      });
      res.redirect("/admin/furnitures");
    });
  } catch (err) {
    res.send(err);
  }
};

exports.deleteFurniture = async (req, res) => {
  try {
    await Furniture.findByIdAndDelete(req.body.id);
  } catch (err) {
    res.send(err);
  }
};

exports.getChildCategories = async (req, res) => {
  try {
    const childCategory = req.params.childCategory || null;
    const parentCategory = req.params.parentCategory;
    if (parentCategory && !childCategory) {
      const categories = await Category.find({}).populate("parentCategory");
      const filteredCategories = categories.filter(
        (e) => e.parentCategory?.name == parentCategory
      );
      res.render("childCategories", {
        categories: filteredCategories,
        parentCategory,
        childCategory,
      });
    }
    if (parentCategory && childCategory) {
      res.send(req.params.childCategory);
    }
  } catch (err) {
    console.error(err); // Log the error to the console
    res.send("err");
  }
};

exports.getFurnituresByCategoryPage = async (req, res) => {
  try {
    const childCategory = req.params.childCategory || null;
    const parentCategory = req.params.parentCategory;
    if (parentCategory && childCategory) {
      const furnitures = await Furniture.find({}).populate("category");
      console.log(furnitures[0].category.name);
      const filteredFurnitures = furnitures?.filter(
        (e) => e.category.name == childCategory
      );
      res.render("furnitureByCategory", {
        furnitures: filteredFurnitures,
        childCategory,
        parentCategory,
      });
    }
  } catch (err) {
    console.error(err); // Log the error to the console
    res.send("err");
  }
};

exports.reserveFurniture = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    user.reserved_furnitures.push(req.body.furnitureid);
    await user.save();

    const furniture = await Furniture.findById(req.body.furnitureid);
    furniture.reservedBy = user._id;
    await furniture.save();

    res.redirect(req.headers.referer || "/");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
