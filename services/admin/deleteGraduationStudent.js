//ok
const gradautionStudentModel = require("../../models/gaduationStudent");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

const deleteGrduationStudent = async (request, response) => {
  const { email } = request.body;
  //find student
  const student = await gradautionStudentModel.findOne({ email });
  if (student) {
    //if student exist

    //delete profile photo
    await removeFromCloudinary(student.profilePhoto.publicId);
    //delete comments
    //student comments
    const studentComments = await commentModel.find({ student: student._id });
    console.log(studentComments);
    //post comments
    const posts = await postModel.find({});
    posts.forEach(async (post) => {
      console.log(post.comments);
      studentComments.forEach(async (studentComment) => {
        //check if student have a comment
        const studentCommentExistInPOstComment = post.comments.includes(
          studentComment._id
        );
        if (studentCommentExistInPOstComment) {
          let indexOfStudentCommentInPostComments = post.comments.indexOf(
            studentComment._id
          );
          if (indexOfStudentCommentInPostComments > -1) {
            post.comments.splice(indexOfStudentCommentInPostComments, 1);
          }
        }
      });
      await commentModel.deleteMany({ student: student._id });

      //check if student likes posts
      const studentLikesPosts = post.likes.includes(student._id);
      if (studentLikesPosts) {
        //find index of student
        let indexOfStudent = post.likes.indexOf(student._id);
        // if found
        if (indexOfStudent > -1) {
          //remove student
          post.likes.splice(indexOfStudent, 1);
        }
      }
      await post.save();
    });
    //delte Studnet
    await gradautionStudentModel.deleteOne({ email });
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
