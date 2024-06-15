const lectureModel = require("../../models/lecture");
const path = require("path");
const fs=require("fs")
const uploadLectureToCloudinary = require("../../utils/uploadLectureToCloudnairy");
const subjectModel = require("../../models/subject");
const upload = async (request, response) => {
  try {
    const { number } = request.body;
    const { id } = request.params;
    //find lecture
    const lecture = await lectureModel.findOne({ number });
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
      subject: id,
      addedBy: request.id,
      fileUrl: {
        url: lectureUploaded.secure_url,
        publicId: lectureUploaded.public_id,
      },
    });
    //add lecture to subject
    //find subject
    const subject = await subjectModel.findOne({ _id: id });
    subject.lectures.push(newLecture[0]._id);
    await subject.save();
    fs.unlinkSync(filePath);
    //response
    return response.json({
      status: "Succes",
      message: "Lecture Uploaded Succefully",
      newLecture,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = upload;
