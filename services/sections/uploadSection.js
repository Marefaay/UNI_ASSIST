const path = require("path");
const fs = require("fs");
const subjectModel = require("../../models/subject");
const sectionModel = require("../../models/section");
const uploadSectionToCloudinary = require("../../utils/uploadSectionToCloudnairy");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const uploadSection = async (request, response) => {
  try {
    const { number } = request.body;
    const { title } = request.body;
    // const { id } = request.params;
    //find prof
    const prof = await profOrProfAssistModel.findOne({ _id: request.id });
    //prof not exist
    if (!prof) {
      return response.json({ stauts: "Error", message: "Prof Is Not Exist" });
    }
    //find subject
    const subject = await subjectModel.findOne({ title });
    //subject Not Found
    if (!subject) {
      return response.json({
        status: "Error",
        message: "Subject Is not Found",
      });
    }
    //find section
    const section = await sectionModel.findOne({ number });
    //section Exist
    if (section) {
      return response.json({
        status: "Error",
        message: "section Is Already Exist",
      });
    }
    //section Not Exist
    //check if there is file to upload
    if (!request.file) {
      return response.json({ status: "Error", message: "No File To upload" });
    }
    //section Path
    const filePath = path.join(
      __dirname,
      `../../LectureFiles/${request.file.filename}`
    );
    //upload to cloudnairy
    const sectionUploaded = await uploadSectionToCloudinary(filePath);
    //add section to db
    const newSection = await sectionModel.insertMany({
      number: number,
      subject: subject._id,
      addedBy: request.id,
      fileUrl: {
        url: sectionUploaded.secure_url,
        publicId: sectionUploaded.public_id,
      },
      generatedAt: new Date().toLocaleString(),
    });
    //add section to subject

    subject.sections.push(newSection[0]._id);
    await subject.save();
    fs.unlinkSync(filePath);
    //find uploaded section
    const uploadedSection = await sectionModel
      .findOne({ _id: newSection[0]._id })
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
      message: "Section Uploaded Succefully",
      uploadedSection,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = uploadSection;
