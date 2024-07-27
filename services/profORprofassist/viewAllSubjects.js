const profOrProfAssistModel = require("../../models/prof-profAssist");

const ViewAllSubjects = async (request, response) => {
  const prof = await profOrProfAssistModel.findOne({ _id: request.id });
  ///prof not exist
  if (!prof) {
    return response.json({
      status: "Error",
      message: "This ProfOrProfAssist Is Not Found",
    });
  }
  console.log(prof.subject);
  return response.json({
    status: "Success",
    message: "Subjects Retrived Succefully",
    subjects: prof.subject,
    subjectsCount: prof.subject.length,
  });
};
module.exports = ViewAllSubjects;
