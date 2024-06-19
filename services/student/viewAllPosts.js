const postModel = require("../../models/post");
const studentModel = require("../../models/student");

const viewAllPosts = async (request, response) => {
  //find Student
  const student = await studentModel.findOne({ _id: request.id });
  //student not exist
  if (!student) {
    return response.json({ status: "Error", message: "Student Is Not Found" });
  }
  const posts = await postModel
    .find({})
    .populate("publisher", {
      _id: 0,
      email: 0,
      password: 0,
      subject: 0,
      profilePhoto: 0,
      addedBy: 0,
      role: 0,
      isAdmin: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    })
    .populate("comments");
  console.log(posts[0]);
  ///there is NO posts
  if (posts.length == 0) {
    return response.json({ status: "Error", message: "No Posts To Show" });
  }
  // there is a posts
  return response.json({
    status: "Success",
    message: "Posts Retrived Succefully",
    posts,
    postCount: posts.length,
  });
};
module.exports = viewAllPosts;
