const postModel = require("../../models/post");

const getProfPosts = async (request, response) => {
  //find posts that published by prof
  const posts = await postModel
    .find({ publisher: request.id })
    .populate("publisher");
  const postsCount = posts.length;
  console.log(posts.length);
  //if prof have no posts
  if (posts.length == 0) {
    return response.json({
      status: "Error",
      message: "This Prof have No Posts",
    });
  }
  //if have posts''
  return response.json({
    status: "Success",
    message: "Posts retrived succefuully",
    posts,
    postsCount,
  });
};
module.exports = getProfPosts;
