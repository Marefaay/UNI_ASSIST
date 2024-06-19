const mongoose = require("mongoose");

// Define Lecture schema

const lectureSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
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
      url: "https://th.bing.com/th/id/R.152c34a899b6bf22d4da6c91b74403dd?rik=ELN9t4jt5Z7dhA&pid=ImgRaw&r=0",
      publidId: null,
    },
  },
  generatedAt: String, // Store Cloudinary URL
});
const lectureModel = mongoose.model("Lecture", lectureSchema);
module.exports = lectureModel;
