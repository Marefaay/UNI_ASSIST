const lectureModel = require("../../models/lecture");

const downloadLecture = async (request, response) => {
  //params
  const { id } = request.params;
  //find lecture
  const lecture = await lectureModel.findOne({ _id: id });
  //lecture not exist
  if (!lecture) {
    return response.json({
      status: "Error",
      message: "This Lecture Is Not Found",
    });
  }
  //lecture exist
  //lecture Url
  const lectureUrl = lecture.fileUrl.url;
  //response
  return response.json({ status: "Success", message: "Success", lectureUrl });
};
module.exports = downloadLecture;
