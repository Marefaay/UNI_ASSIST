const postModel = require("../../models/post");

const updatePost = async (request, response) => {
  const { title, description } = request.body;
  const { id } = request.params;
  //find post
  const post = await postModel.findOne({ _id: id });
  //post not exist
  if (!post) {
    return response.json({ status: "Error", message: "Post Not Found" });
  }
  //   post Exist
  const updatedPost = await postModel.updateOne(
    { _id: id },
    { title, description }
  );
  const upadtedPost = await postModel
    .findOne({ _id: id })
    .populate("publisher");
  return response.json({
    status: "Succes",
    message: "Post Updated Succefully",
    upadtedPost,
  });
};
module.exports = updatePost;
