const postModel = require("../../models/post");

const deletePost = async (request, response) => {
  const { id } = request.params;
  //find post
  const post = await postModel.findOne({ _id: id });
  //post Not Exist
  if (!post) {
    return response.json({ status: "Error", message: "Post Not Found" });
  }
  //Post Exist
  //delete post
  await postModel.deleteOne({ _id: id });
  ///delte comments @@@todo
  return response.json({
    status: "Success",
    message: "Post Deleted Succefully",
  });
};
module.exports = deletePost;
