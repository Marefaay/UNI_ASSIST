const postModel = require("../../models/post");
const profOrProfAssistModel = require("../../models/prof-profAssist");

const getOnePost = async (request, response) => {
  const { id } = request.params;
  //find prof
  const prof = await profOrProfAssistModel.findOne({ _id: request.id });
  //prof Not Exist
  if (!prof) {
    return response.json({ status: "Error", message: "Prof Is Not Exist" });
  }
  //find post
  const post = await postModel.findOne({ _id: id }).populate("publisher", {
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
