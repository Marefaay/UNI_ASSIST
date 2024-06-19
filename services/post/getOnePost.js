const postModel = require("../../models/post");

const getOnePost = async (request, response) => {
  const { id } = request.params;
  //find post
  const post = await postModel.findOne({ _id: id });
  //post Not Exist
  if (!post)
    return response.json({
      status: "Error",
      message: "This Post Is Not Found",
    });
  //Post Exist
  return response.json({
    status: "Succes",
    message: "Post Retrived Succefully",
    post,
  });
};
module.exports = getOnePost;
