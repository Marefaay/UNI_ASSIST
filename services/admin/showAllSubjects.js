//ok
const subjectModel = require("../../models/subject");

const showAllSubjects = async (request, response) => {
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
      subjectsCount,
      message: subjects,
     
    });
  }
};
module.exports = showAllSubjects;
