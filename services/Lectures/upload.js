const lectureModel = require("../../models/lecture");
const path = require("path");
const fs = require("fs");
const uploadLectureToCloudinary = require("../../utils/uploadLectureToCloudnairy");
const subjectModel = require("../../models/subject");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const upload = async (request, response) => {
  try {
    const { number } = request.body;
    const { title } = request.body;
    // const { id } = request.params;
    //find subject
    const subject = await subjectModel.findOne({ title });
    //find lecture
    const lecture = await lectureModel.findOne({
      number,
      subject: subject._id,
    });

    //find prof
    const prof = await profOrProfAssistModel.findOne({ _id: request.id });
    //prof not exist
    if (!prof) {
      return response.json({ status: "Error", message: "Prof Is Not Found" });
    }
    //subject not eexist
    if (!subject) {
      return response.json({
        status: "Error",
        message: "Subject Is Not FOund",
      });
    }
    //lecture Exist
    if (lecture) {
      return response.json({
        status: "Error",
        message: "Lecture Is Already Exist",
      });
    }
    //lecture Not Exist
    //check if there is file to upload
    if (!request.file) {
      return response.json({ status: "Error", message: "No File To upload" });
    }
    //Lecture Path
    const filePath = path.join(
      __dirname,
      `../../LectureFiles/${request.file.filename}`
    );
    //upload to cloudnairy
    const lectureUploaded = await uploadLectureToCloudinary(filePath);
    //add lecture to db
    const newLecture = await lectureModel.insertMany({
      number: number,
      subject: subject._id,
      addedBy: request.id,
      fileUrl: {
        url: lectureUploaded.secure_url,
        publicId: lectureUploaded.public_id,
      },
      generatedAt: new Date().toLocaleString(),
    });
    //add lecture to subject

    subject.lectures.push(newLecture[0]._id);
    await subject.save();
    fs.unlinkSync(filePath);
    //find uploaded Lecture
    const uploadedlecture = await lectureModel
      .findOne({
        _id: newLecture[0]._id,
      })
      .populate("addedBy", {
        _id: 0,
        email: 0,
        password: 0,
        subject: 0,
        profilePhoto: 0,
        addedBy: 0,
        role: 0,
        isAdmin: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      })
      .populate("subject", {
        _id: 0,
        ID: 0,
        numberOfHours: 0,
        lectures: 0,
        sections: 0,
        teachedBy: 0,
        addedBy: 0,
        lectureAttendance: 0,
        sectionAttendance: 0,
        createdAt: 0,
        __v: 0,
        updatedAt: 0,
      });
    //response
    return response.json({
      status: "Succes",
      message: "Lecture Uploaded Succefully",
      uploadedlecture,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = upload;
