const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    const createCategory = { name };
    if (parentCategory) {
      createCategory.parentCategory = parentCategory;
    }
    const category = await Category.create(createCategory);
    res.send(category);
  } catch (err) {
    res.send(err);
  }
};
