const path = require("path");
const postModel = require("../../models/post");
const addPost = async (request, response) => {
  const { title, description, category, uploadedBy } = request.body;
//if post provide image
  if (request.file) {
    //  Upload photo
    const imagePath = path.join(
      __dirname,
      `../../postImages/${request.file.filename}`
    );
    const result = await uploadPostImageToCloudnairy(imagePath);

    //  Create new post and save it to DB
    const post = await postModel.insertMany({
      title: title,
      description: description,
      category: category,
      uploadedBy: request.id,
      Image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    //  Send response to the client
    response.json({ status: "Sucess", message: "Post Added Succefully", post });
    //  Remove image from the server
    fs.unlinkSync(imagePath);
  }
  // if post dosen't provide image
  //  Create new post and save it to DB
  const post = await postModel.insertMany({
    title: title,
    description: description,
    category: category,
    uploadedBy: request.id,
    // Image: {
    //   url: result.secure_url,
    //   publicId: result.public_id,
    // },
  });

  //  Send response to the client
  response.json({ status: "Sucess", message: "Post Added Succefully", post });
  // Remove image from the server
  // fs.unlinkSync(imagePath);
};
module.exports = addPost;
