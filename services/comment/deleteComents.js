const commentModel = require("../../models/comment");
const postModel = require("../../models/post");

const deleteComment = async (request, response) => {
  const { id } = request.params;
  //find Comment
  const comment = await commentModel.findOne({ _id: id });
  //comment not exist
  if (!comment) {
    return response.json({ status: "Error", message: "Comment Is Not Found" });
  }
  //   comment is Exist

  //delte from post
  const posts = await postModel.find({});
  console.log(posts);
  posts.forEach(async (post) => {
    console.log(post.comments);
    const com = post.comments.includes(id);
    if (com) {
      //find index of comment
      let indexOfComment = post.comments.indexOf(id);
      // if found
      if (indexOfComment > -1) {
        //remove comment
        post.comments.splice(indexOfComment, 1);
        await post.save();
      }
      // console.log(indexOfLecture);
    }
  });
  //delete from comment collection
  await commentModel.deleteOne({ _id: id });
  return response.json({
    status: "Success",
    message: "Comment Deleted Succefully",
  });
};
module.exports = deleteComment;
