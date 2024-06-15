const lectureModel = require("../../models/lecture");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");
const uploadLectureToCloudinary = require("../../utils/uploadLectureToCloudnairy");
const path = require("path");
const updateLecturePDF = async (request, response) => {
  const { id } = request.params;
  //find lecture
  const lecture = await lectureModel.findOne({ _id: id });
  //lecture Is Not Exist
  if (!lecture) {
    return response.json({
      status: "Error",
      message: "This Lecture IS not Found",
    });
  }
  //Lecture IS Exist
  //check Public ID
  if (request.file) {
    //Lecture Path
    const filePath = path.join(
      __dirname,
      `../../LectureFiles/${request.file.filename}`
    );
    //remove old lecture from cloudnairy
    await removeFromCloudinary(lecture.fileUrl.publicId);
    //upload new lectture to cloudniary
    const newLecture = await uploadLectureToCloudinary(filePath);
    //update url of lecture
    await lectureModel.updateOne(
      { _id: id },
      {
        fileurl: { url: newLecture.secure_url, publicId: newLecture.public_id },
      }
    );
    return response.json({
      status: "Success",
      message: "Lecture Pdf Updated Scuuefully",
    });
  } else {
    return response.json({ status: "Error", message: "No File To Upload" });
  }
};
module.exports = updateLecturePDF;
