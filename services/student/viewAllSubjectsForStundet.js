//ok
const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");

const viewAllSubjectsForStudent = async (request, response) => {
  //find prof
  const student = await studentModel.findOne({ _id: request.id });
  //prof not exist
  if (!student) {
    return reposne.json({
      status: "Error",
      message: "This student Is Not Found",
    });
  }
  //find all subjects
  const subjects = await subjectModel.find({});
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
      message: "Subjects Retrived Succefully",
      subjects,
      subjectsCount,
    });
  }
};
module.exports = viewAllSubjectsForStudent;
