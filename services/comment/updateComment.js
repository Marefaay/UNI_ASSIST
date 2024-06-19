const commentModel = require("../../models/comment");

const upadteComment = async (request, response) => {
  const { id } = request.params;
  const { text } = request.body;
  //find comment
  const comment = await commentModel.findOne({ _id: id });
  //comment not exist
  if (!comment) {
    return response.json({ status: "Error", message: "Comment Is Not Exist" });
  }
  //comment is exist
  await commentModel.updateOne({ _id: id }, { text });
  return response.json({
    status: "Success",
    message: "You Comment Updated Succefully",
  });
};
module.exports = upadteComment;
