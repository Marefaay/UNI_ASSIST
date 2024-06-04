const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  yearNo: { type: Number, required: true, min: 1, max: 4 },
  semesters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Semester" }],
});

const yearModel = mongoose.model("Year", yearSchema);
module.exports = yearModel;
