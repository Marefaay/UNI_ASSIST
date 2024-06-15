
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadSectionToCloudinary = async (filePath) => {
  try {
    const uploadedLecture = await cloudinary.uploader.upload(filePath, {
      folder: "UNI-ASSIST/sections",
      resource_type: "raw",
    });
    return uploadedLecture;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = uploadSectionToCloudinary;
