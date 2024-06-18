//ok
const gradautionStudentModel = require("../../models/gaduationStudent");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

const deleteGrduationStudent = async (request, response) => {
  const { email } = request.body;
  //find student
  const student = await gradautionStudentModel.findOne({ email });
  if (student) {
    //if student exist
    //delte Studnet
    await gradautionStudentModel.deleteOne({ email });
    //delete profile photo
    await removeFromCloudinary(student.profilePhoto.publicId);
    //delete posts comments@@@TODO
    //response
    return response.json({
      status: "Success",
      message: `Graduation Student with email('${email}') Deleted Succefully`,
    });
  } else {
    //If STudent Not Exist
    //response
    return response.json({
      status: "Error",
      message: `No Graduation Student With this ID ('${email}')`,
    });
  }
};
module.exports = deleteGrduationStudent;
