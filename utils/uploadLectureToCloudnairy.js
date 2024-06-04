const cloudinary = require("cloudinary");
//Integration

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const uploadLectureToCloudnairy = async (lecture) => {
  try {
    const uploadedLecture = cloudinary.v2.uploader.upload(lecture, {
      folder: "UNI-ASSIST/Lectures",
      resource_type: "raw",
    });
    return uploadedLecture;
  } catch (error) {
    return error;
  }
};
module.exports = uploadLectureToCloudnairy;
