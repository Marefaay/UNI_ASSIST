//ok
const profOrProfAssistModel = require("../../models/prof-profAssist");
const subjectModel = require("../../models/subject");

const viewAllSubjectsForPof = async (request, response) => {
  //find prof
  const prof = await profOrProfAssistModel.findOne({ _id: request.id });
  //prof not exist
  if (!prof) {
    return response.json({
      status: "Error",
      message: "This ProfOrProfAssist Is Not Found",
    });
  }
  //find all subjects
  const subjects = await subjectModel.find({}).populate("teachedBy");
  //find count of subjects
  const subjectsCount = await subjectModel.find({}).count();
  if (subjects.length == 0) {
    //if nno subject
    return response.json({
      status: "Error",
      message: "No Subjects To be Shown",
    });
  } else {
    //if tere is a subject
    return response.json({
      status: "Success",
      message: "Subjects retrived Succefully",
      subjects,
      subjectsCount,
    });
  }
};
module.exports = viewAllSubjectsForPof;
