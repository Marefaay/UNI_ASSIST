const commentModel = require("../../models/comment");

const studentComments = async (request, response) => {
  //find student comments
  const comments = await commentModel
    .find({ student: request.id })
    .populate("student");
  //no comments
  if (comments == 0) {
    return response.json({
      status: "Error",
      message: "This Student Has No Comments",
    });
  }
  //there is comments
  return response.json({
    status: "Success",
    message: "Comments Retireved Succefully",
    comments,
    commentsCount: comments.length,
  });
};
module.exports = studentComments;
