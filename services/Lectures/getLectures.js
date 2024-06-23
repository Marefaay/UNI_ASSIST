// const lectureModel = require("../../models/lecture");
const subjectModel = require("../../models/subject");

const getLectures = async (request, response) => {
  try {
    const { id } = request.params;
    const subject = await subjectModel
      .findOne({ _id: id }, { _id: 0, addedBy: 0, __v: 0 })
      .populate("lectures",{_id:0,addedBy:0,subject:0});
    if (!subject) {
      return response.json({
        status: "Error",
        message: "This Subject Is Not Found",
      });
    } else {
      return response.json({
        status: "Success",
        message: `lectures Of ${subject.title}retrived succully`,
        lectures: subject.lectures,
      });
    }
  } catch (error) {
    return response.json({ status: "Error", message: error });
  }
};
module.exports = getLectures;
