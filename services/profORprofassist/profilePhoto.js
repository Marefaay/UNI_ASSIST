const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const uploadProfOrProfAssistToCloudinary = require("../../utils/uploadProf-ProfAssistToCloudinary");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");
const profilePhoto = async (request, response) => {
  const token = request.header("token");
  if (request.file) {
    //get image path
    const imagePath = path.join(
      __dirname,
      `../../profilePhotos/${request.file.filename}`
    );
    //upload to cloudaniary
    const upload = await uploadProfOrProfAssistToCloudinary(imagePath);
    //get user
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        response.json({ message: "Error", err });
      } else {
        //get prof-profAssist
        const profOrProfAssist = await profOrProfAssistModel.findById(
          decoded.id
        );
        //delte old image
        if (profOrProfAssist.profilePhoto.publicId != null) {
          //remove image
          await removeFromCloudinary(profOrProfAssist.profilePhoto.publicId);
        }
        //set new image
        profOrProfAssist.profilePhoto = {
          url: upload.secure_url,
          publicId: upload.public_id,
        };
        //save
        await profOrProfAssist.save();
        //delte image from local server
      }
    });
    fs.unlinkSync(imagePath);
    //response
    return response.json({
      status: "Success",
      message: "Profile Photo Uploaded Succefully",
    });
  } else {
    return response.json({ status: "Error", message: "No Image To Upload" });
  }
};
module.exports = profilePhoto;
