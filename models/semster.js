const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  semesterNo: {
    type: Number,
    min: 1,
    max: 2,
    required: true,
  },
  yearNo: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
  },
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  ],
});
const semesterModel = mongoose.model("Semester", semesterSchema);
module.exports = semesterModel;
