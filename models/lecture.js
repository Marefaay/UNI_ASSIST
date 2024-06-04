const mongoose = require("mongoose");

// Define Lecture schema

const lectureSchema = new mongoose.Schema({
  number:{
    type:Number,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "prof-profAssist",
  },
  fileUrl: {
    type: Object,
    default: {
      url: "",
      publidId: null,
    },
  }, // Store Cloudinary URL
});
const lectureModel = mongoose.model("Lecture", lectureSchema);
module.exports = lectureModel;
