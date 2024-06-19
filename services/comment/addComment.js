const commentModel = require("../../models/comment");
const postModel = require("../../models/post");
const studentModel = require("../../models/student");

const addComment = async (request, response) => {
  const { id } = request.params;
  const { text } = request.body;
  //find Student
  const student = await studentModel.findOne({ _id: request.id });
  //find post
  const post = await postModel.findOne({ _id: id });
  console.log(post);
  console.log(student);
  //stydent is not exist
  if (!student) {
    return response.json({ status: "Error", message: "Student Is Not Found" });
  }
  //post is not exist
  if (!post) {
    return response.json({ status: "Error", message: "Post Is Not Found" });
  }
  //student exist
  //add comment to commet colllection
  const comment = await commentModel.insertMany({
    postId: id,
    student: request.id,
    text: text,
    username: student.name,
  });
  // add commmet to comments array in post
  console.log(post.comments);
console.log(comment)
console.log(comment[0]._id)
  post.comments.push(comment[0]._id);
  await post.save();
  return response.json({
    status: "Success",
    message: "Your Comment Added Succefulyy",
    comment,
  });
};
module.exports = addComment;
