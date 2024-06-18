//OK
const studentModel = require("../../models/student");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

//Bussiness Logic
const deleteStudent = async (request, repsone) => {
  const { email } = request.body;
  //find Student
  const student = await studentModel.findOne({ email });
  if (student) {
    //delte student from database
    await studentModel.deleteOne({ email });
    //delete profile photo
    await removeFromCloudinary(student.profilePhoto.publicId);
    //delete comments @TODO
    //response
    return repsone.json({
      status: "Succes",
      message: `User With id ('${email}') deleted succefully`,
    });
  } else {
    //if user not found
    return repsone.json({
      status: "Error",
      message: `No User Found With Id('${email}')`,
    });
  }
};
module.exports = deleteStudent;
