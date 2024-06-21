//OK
const commentModel = require("../../models/comment");
const postModel = require("../../models/post");
const studentModel = require("../../models/student");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

//Bussiness Logic
const deleteStudent = async (request, repsone) => {
  const { email } = request.body;
  //find Student
  const student = await studentModel.findOne({ email });
  if (student) {
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

    //delte student from database
    await studentModel.deleteOne({ email });
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
