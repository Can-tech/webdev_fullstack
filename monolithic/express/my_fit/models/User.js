const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  enrolled_classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  role: {
    type: String,
    enum: ["user", "instructor", "admin"],
    default: "user",
  },
  image: {
    type: String,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
