const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Furniture = mongoose.model("Furniture", furnitureSchema);
module.exports = Furniture;
