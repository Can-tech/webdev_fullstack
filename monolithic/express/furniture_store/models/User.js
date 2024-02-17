const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reserved_furnitures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Furniture",
    },
  ],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return next();
    }
    this.password = hash;
    return next();
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
