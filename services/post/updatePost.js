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
    });
  return response.json({
    status: "Succes",
    message: "Post Updated Succefully",
    upadtedPost,
  });
};
module.exports = updatePost;
