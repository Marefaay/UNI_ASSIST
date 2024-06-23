// const sectionModel = require("../../models/section");
const subjectModel = require("../../models/subject");

const getSections = async (request, response) => {
  try {
    const { id } = request.params;
    const subject = await subjectModel
      .findOne({ _id: id },)
      .populate("sections",{_id:0,addedBy:0,subject:0,__v:0});

    if (!subject) {
      return response.json({
        status: "Error",
        message: "This Subject Is Not Found",
      });
    } else {
      return response.json({
        status: "Success",
        message: `Sections Of ${subject.title}retrived succfully`,
        section: subject.sections,
      });
    }
  } catch (error) {
    return response.json({ status: "Error", message: error });
  }
};
module.exports = getSections;
