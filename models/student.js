const mongoose = require("mongoose");

//student Schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 15,
    },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://th.bing.com/th/id/R.152c34a899b6bf22d4da6c91b74403dd?rik=ELN9t4jt5Z7dhA&pid=ImgRaw&r=0",
        publidId: null,
      },
    },
    addedBy: {
      type: String,
      ref: "Admin",
    },
    role: {
      type: String,
      default: "student",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;
