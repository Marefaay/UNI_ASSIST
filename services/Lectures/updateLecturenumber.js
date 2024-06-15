const lectureModel = require("../../models/lecture");

const updateLectureNumber = async (request, response) => {
  const { id } = request.params;
  const { number } = request.body;
  //find lecture
  const lecture = await lectureModel.findOne({ _id: id });
  //Lecture Not Exist
  if (!lecture) {
    return response.json({
      status: "Error",
      message: "This Lecture Is Not Exist",
    });
  }
  //Lecture Exist
  //number is already exist
  const lectureFounded = await lectureModel.findOne({ number });
  if (lectureFounded) {
    return response.json({
      status: "Error",
      message: "There Is Already Lecture With this Number ",
    });
  }
  await lectureModel.updateOne({ _id: id }, { number });
  //response
  return response.json({
    status: "Success",
    message: `Number of Lecture Updated To ${number}`,
  });
};
module.exports = updateLectureNumber;
