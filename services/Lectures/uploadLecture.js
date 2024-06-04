const lectureModel = require("../../models/lecture");
const subjectModel = require("../../models/subject");
const path = require("path");
const uploadLectureToCloudnairy = require("../../utils/uploadLectureToCloudnairy");
const uploadLecture = async (request, response) => {
  const { number } = request.body;
  const { id } = request.params;
  const lectureExist = await lectureModel.findOne({ number });
  if (lectureExist) {
    return response.json({
      status: "Error",
      message: "Lecture Is Already Exist",
    });
  }
  // console.log(lecture);
  //check if there is a file to upload
  if (request.file) {
    //get image path
    const filePath = path.join(
      __dirname,
      `../../LectureFiles/${request.file.filename}`
    );

    //upload to cloudnairy
    const lectureUploaded = await uploadLectureToCloudnairy(filePath);
    //get subject
    const subject = await subjectModel.findOne({ _id: id });
  
    const lecture = await lectureModel.insertMany({
      number: number,
      subject: id,
      addedBy: request.id,
      fileUrl: {
        url: lectureUploaded.secure_url,
        publicId: lectureUploaded.public_id,
      },
    });
    console.log(lecture[0]._id);
    subject.lectures.push(lecture[0]._id);
    await subject.save();
    //remove from local
    return response.json({
      status: "Success",
      message: "Lecture uploadded succeully",
      lecture,
    });
  }
};
module.exports = uploadLecture;
