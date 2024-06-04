const mongoose = require("mongoose");

//prof-profAssist Schema
const profOrProfAssistSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      trim: true,
      minlength: 15,
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
      trim: true,
    },
    subject: {
      type: Array,
      required: true,
      ref: "Subject",
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
    role:{
      type:String,
      default:"prof-profAssist",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const profOrProfAssistModel = mongoose.model(
  "prof-profAssist",
  profOrProfAssistSchema
);
module.exports = profOrProfAssistModel;
