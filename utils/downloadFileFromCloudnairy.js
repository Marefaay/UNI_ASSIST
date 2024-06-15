const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const downloadFileFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: "raw",
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = downloadFileFromCloudinary;
