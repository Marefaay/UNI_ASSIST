const adminModel = require("../../models/admin");
const commentModel = require("../../models/comment");
const postModel = require("../../models/post");
const studentModel = require("../../models/student");
const deleteStudentsAtSpecificLevel = async (request, response) => {
  try {
    const { level } = request.body;
    //find admin
    const admin = await adminModel.findOne({ _id: request.id });
    console.log(admin);
    //admin not found
    if (!admin) {
      return response.json({ status: "Error", message: "Admin Is Not Found" });
    }
    //find students
    const students = await studentModel.find({ level: level });
    console.log(students);
    //No students In this level
    if (students.length == 0) {
      return response.json({
        status: "Error",
        message: `No Students In Level ${level}`,
      });
    }
    //remove images from cloudniry
    students.forEach(async (std) => {
      await removeFromCloudinary(std.profilePhoto.publicId);
    });
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

    //student exist
    await studentModel.deleteMany({ level: level });
    //response
    return response.json({
      status: "Success",
      message: `All Students with Level ${level} are retrived Succfully `,
      students,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = deleteStudentsAtSpecificLevel;
