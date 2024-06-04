//ok
const gradautionStudentModel = require("../../models/gaduationStudent");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

const deleteGrduationStudent = async (request, response) => {
  const { id } = request.params;
  //find student
  const student = await gradautionStudentModel.findOne({ _id: id });
  if (student) {
    //if student exist
    //delte Studnet
    await gradautionStudentModel.deleteOne({ _id: id });
    //delete profile photo
    await removeFromCloudinary(student.profilePhoto.publicId);
    //delete posts comments@@@TODO
    //response
    return response.json({
      status: "Success",
      message: "Graduation Student Deleted Succefully",
    });
  } else {
    //If STudent Not Exist
    //response
    return response.json({
      status: "Error",
      message: `No Graduation Student With this ID ('${id}')`,
    });
  }
};
module.exports = deleteGrduationStudent;
