const mongoose = require("mongoose");

//Subject Schema

const subjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 25,
      trim: true,

      required: true,
    },
    ID: {
      type: String,
     
      unique: true,
      required: true,
    },
    numberOfHours: {
      type: String,
      required: true,
    },
    lectureAttendance: [
      {
        student: { type: String },
        week: { type: Array},
        group: { type: String },
        department: { type: String },
        location: { type: String },
        lecturerName: { type: String },
        scannedTime: { type: Date, default: Date.now().toString() },
      },
    ],
    sectionAttendance: [
      {
        student: { type: String },
        sectionNo: { type: String },
        week: { type: Array },
        group: { type: String },
        department: { type: String },
        location: { type: String },
        lecturerName: { type: String },
        scannedTime: { type: Date, default: Date.now().toString() },
      },
    ],
    lectures: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture'
    }],
    sections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section'
    }],
    teachedBy: {
      type: [mongoose.Types.ObjectId],
      // required: true,

      ref: "prof-profAssist",
    },
    addedBy: {
      type: String,
      ref: "Admin",
    },
  },
  { timestamps: true }
);
//subjectModel

const subjectModel = mongoose.model("Subject", subjectSchema);

module.exports = subjectModel;
