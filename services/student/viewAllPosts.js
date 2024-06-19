const postModel = require("../../models/post");

const viewAllPosts = async (request, response) => {
  const posts = await postModel.find({}).populate("publisher", "comments");

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
