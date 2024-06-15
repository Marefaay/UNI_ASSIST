const lectureModel = require("../../models/lecture");

const getLecture = async (request, response) => {
  try {
    const { id } = request.params;
    const lecture = await lectureModel.findOne(
      { _id: id },
      { _id: 0, subject: 0, addedBy: 0, __v: 0 }
    );
    if (!lecture) {
      return response.json({
        status: "Error",
        message: "This Lecture Is Not Found",
      });
    } else {
      return response.json({ status: "Success", message: "Lecture ", lecture });
    }
  } catch (error) {
    return response.json({ status: "Error", message: error });
  }
};
module.exports = getLecture;
