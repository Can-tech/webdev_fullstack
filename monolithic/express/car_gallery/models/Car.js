const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  bodyStyle: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  horsepower: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Car", carSchema);
