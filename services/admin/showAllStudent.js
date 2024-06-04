//OK
const studentModel = require("../../models/student");

const showAllStudent = async (request, response) => {
  //find all student
  const students = await studentModel.find({});
  //count student
  const studentsCount = await studentModel.find({}).count();
  if (students.length == 0) {
    //if no student exist
    return response.json({
      status: "Error",
      message: "No student To be Shown",
    });
  } else {
    //if there are student exist
    return response.json({
      status: "Success",
      message: students,
      studentsCount,
    });
  }
};
module.exports = showAllStudent;
