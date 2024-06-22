//ok
const subjectModel = require("../../models/subject");
const adminModel = require("../../models/admin");

const showAllSubjects = async (request, response) => {
  //find admin
  const admin = await adminModel.findOne({ _id: request.id });
  //admin not exist
  if (!admin) {
    return response.json({
      status: "Error",
      message: "This Admin Is Not Find",
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
      subjectsCount,
      message: subjects,
    });
  }
};
module.exports = showAllSubjects;
