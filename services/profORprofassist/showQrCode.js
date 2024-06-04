const path=require("path")
const showQrCode = async (request, response) => {
  // const {qr}=request.body;
  if (request.file) {
    const imagePath = path.join(
      __dirname,
      `../../QRCodes/${request.file.filename}`
    );
    return response.json({ status: "Sucess", message: imagePath });
  } else {
    return response.json({
      status: "Error",
      message: "No File QR Code to show",
    });
  }
};
module.exports = showQrCode;
