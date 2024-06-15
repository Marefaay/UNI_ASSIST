const lectureModel = require("../../models/lecture");
const subjectModel = require("../../models/subject");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

const deleteLecture = async (request, response) => {
  const { id } = request.params;
  //find lecture
  const lecture = await lectureModel.findOne({ _id: id });
  //lecture not found
  // console.log(lecture);
  if (!lecture) {
    return response.json({
      status: "Error",
      message: "This Lecture Is Not Exist",
    });
  }
  //lecture is found
  //delete lecture from cloudniry
  //   console.log(lecture.fileUrl.publicId);
    const remove = await removeFromCloudinary(lecture.fileUrl.publicId);
  console.log(remove);
  //delete lecture from lecture collection
  const lectureDeleted = await lectureModel.deleteOne({ _id: id });

  //delete lecture from subject
  //find lecture
  const subject = await subjectModel.findOne({ _id: lecture.subject });
  // console.log(subject);
  //check if subject contain this lecture
  const cont = subject.lectures.includes(id);
  if (cont) {
    //find index of lecture
    let indexOfLecture = subject.lectures.indexOf(id);
    // if found
    if (indexOfLecture > -1) {
      //remove lecture
      subject.lectures.splice(indexOfLecture, 1);
      await subject.save();
    }
    // console.log(indexOfLecture);
  }
  // console.log(cont);
  return response.json({
    status: "Success",
    message: `Lecture Number ${lecture.number} IS Deleted Succelly`,
  });
};
module.exports = deleteLecture;
