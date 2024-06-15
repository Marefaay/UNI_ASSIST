const path = require("path");
const fs=require("fs")
const subjectModel = require("../../models/subject");
const sectionModel = require("../../models/section");
const uploadSectionToCloudinary = require("../../utils/uploadSectionToCloudnairy");
const uploadSection = async (request, response) => {
  try {
    const { number } = request.body;
    const { id } = request.params;
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
      subject: id,
      addedBy: request.id,
      fileUrl: {
        url: sectionUploaded.secure_url,
        publicId: sectionUploaded.public_id,
      },
    });
    //add section to subject
    //find subject
    const subject = await subjectModel.findOne({ _id: id });
    subject.sections.push(newSection[0]._id);
    await subject.save();
    fs.unlinkSync(filePath);
    //response
    return response.json({
      status: "Succes",
      message: "Section Uploaded Succefully",
      newSection,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = uploadSection;
