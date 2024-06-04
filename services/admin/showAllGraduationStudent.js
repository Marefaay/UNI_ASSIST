//OK
const gradautionStudentModel = require("../../models/gaduationStudent");

const showAllGraduationStudent = async (request, response) => {
  //find all gradution student
  const graduationStudent = await gradautionStudentModel.find({});
  // fint count of graduation student
  const graduationStudentCount = await gradautionStudentModel.find({}).count();

  if (graduationStudent.length == 0) {
    ///if there are no graduation student
    return response.json({
      status: "Error",
      message: "No Graduation Student to be Shoen",
    });
  } else {
    //if therea re gradution student
    return response.json({
      status: "Success",
      message: graduationStudent,
      graduationStudentCount,
    });
  }
};
module.exports = showAllGraduationStudent;
