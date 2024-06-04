const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");
const uploadStudentProfileToCloudinary = require("../../utils/uploadStudentProfilePhotoRoCloudinar");
const studentModel = require("../../models/student");
const profilePhoto = async (request, response) => {
  const token = request.header("token");
  if (request.file) {
    //get image path
    const imagePath = path.join(
      __dirname,
      `../../profilePhotos/${request.file.filename}`
    );
    //upload to cloudaniary
    const upload = await uploadStudentProfileToCloudinary(imagePath);
    //get user
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return response.json({ status: "Error", message: err });
      } else {
        //get student
        const student = await studentModel.findById(decoded.id);
        //delte old image
        if (student.profilePhoto.publicId != null) {
          //remove image
          await removeFromCloudinary(student.profilePhoto.publicId);
        }

        console.log("vmskvmfkvmk")
        //set new image
        student.profilePhoto = {
          url: upload.secure_url,
          publicId: upload.public_id,
        };
        //save
        await student.save();
        console.log(student)
      }
    });
    //delte image from local server
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
