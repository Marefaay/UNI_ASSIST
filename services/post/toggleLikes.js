const postModel = require("../../models/post");

const toggleLikes = async (request, response) => {
  const { id } = request.params;
  //find Post
  const post = await postModel.findOne({ _id: id });
  //Post Not Exist
  if (!post) {
    return response.json({ status: "Error", message: "Post Not Found" });
  }
  //Post Exist
  console.log(post.likes);
  //student liikes post
  const userLikedPost = post.likes.includes(request.id);
  console.log(userLikedPost);
  if (userLikedPost) {
    //find index of student
    let indexOfStudent = post.likes.indexOf(request.id);
    console.log(indexOfStudent);
    // if found
    if (indexOfStudent > -1) {
      //remove lecture
      post.likes.splice(indexOfStudent, 1);
      await post.save();
    }
    console.log(post.likes);
    return response.json({
      status: "Success",
      message: "You removed Like From This Post Succefully",
    });
  }
  //student dosenot likes post
  post.likes.push(request.id);
  await post.save();
  return response.json({
    status: "Success",
    message: "You Liked This Post Succeully",
  });
};
module.exports = toggleLikes;
