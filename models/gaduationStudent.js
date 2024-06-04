const mongoose = require("mongoose");

//student Schema
const graduationStudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 15,
    },
    email: { type: String,  trim: true, unique: true },
    password: {
      type: String,
    //   required: true,
      trim: true,
    },
    level: {
      type: String,
      default: "Graduation level",
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const gradautionStudentModel = mongoose.model(
  "graduationStudent",
  graduationStudentSchema
);
module.exports = gradautionStudentModel;
