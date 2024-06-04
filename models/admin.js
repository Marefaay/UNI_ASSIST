const mongoose = require("mongoose");

//Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
//Admin Model
const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
