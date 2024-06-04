//OK
const studentModel = require("../../models/student");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

//Bussiness Logic
const deleteStudent = async (request, repsone) => {
  const { id } = request.params;
  //find Student
  const student = await studentModel.findOne({ _id: id });
  if (student) {
    //delte student from database
    await studentModel.deleteOne({ _id: id });
     //delete profile photo
  await removeFromCloudinary(student.profilePhoto.publicId);
   //delete comments @TODO
  //response
    return repsone.json({
      status: "Succes",
      message: `User With id ('${id}') deleted succefully`,
    });
  } else {
    //if user not found
    return repsone.json({
      status: "Error",
      message: `No User Found With Id('${id}')`,
    });
  }
 
 
};
module.exports = deleteStudent;
