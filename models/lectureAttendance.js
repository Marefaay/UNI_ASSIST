const mongoose = require("mongoose");
const lectureAttendanceSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 25,
    trim: true,

    required: true,
  },

  student: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
});
const lectureAttendanceModel = mongoose.model(
  "lectureAttendance",
  lectureAttendanceSchema
);
module.exports = lectureAttendanceModel;
