const path = require("path");
const postModel = require("../../models/post");
const uploadPostImageToCloudnairy = require("../../utils/uploadPostImageToCloudnairy");
const addPost = async (request, response) => {
  const { title, description, publisher } = request.body;
  //if post provide image
  // if (request.file) {
  //   //  Upload photo
  //   const imagePath = path.join(
  //     __dirname,
  //     `../../postImages/${request.file.filename}`
  //   );
  //   const result = await uploadPostImageToCloudnairy(imagePath);

  //   //  Create new post and save it to DB
  //   const post = await postModel.insertMany({
  //     title: title,
  //     description: description,
  //     publisher: request.id,
  //     image: {
  //       url: result.secure_url,
  //       publicId: result.public_id,
  //     },
  //   });

  //   //  Send response to the client
  //   response.json({ status: "Sucess", message: "Post Added Succefully", post });
  //   //  Remove image from the server
  //   fs.unlinkSync(imagePath);
  // }
  // if post dosen't provide image
  //  Create new post and save it to DB
  const post = await postModel.insertMany({
    title: title,
    description: description,
    publisher: request.id,
    generatedAt: new Date().toLocaleString(),
  });
  // console.log(post);
  const findedPost = await postModel
    .findOne({ _id: post[0]._id })
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
  // console.log(findedPost);
  //  Send response to the client
  return response.json({
    status: "Sucess",
    message: "Post Added Succefully",
    findedPost,
  });
};
module.exports = addPost;
