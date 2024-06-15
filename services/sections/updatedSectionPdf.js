const sectionModel = require("../../models/section");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");
const path = require("path");
const uploadSectionToCloudinary = require("../../utils/uploadSectionToCloudnairy");
const updateSectionPdf = async (request, response) => {
  const { id } = request.params;
  //find section
  const section = await sectionModel.findOne({ _id: id });
  //section Is Not Exist
  if (!section) {
    return response.json({
      status: "Error",
      message: "This section IS not Found",
    });
  }
  //section IS Exist
  //check Public ID
  if (request.file) {
    //Section Path
    const filePath = path.join(
      __dirname,
      `../../LectureFiles/${request.file.filename}`
    );
    //remove old section from cloudnairy
    await removeFromCloudinary(section.fileUrl.publicId);
    //upload new lectture to cloudniary
    const newSection = await uploadSectionToCloudinary(filePath);
    //update url of section
    await sectionModel.updateOne(
      { _id: id },
      {
        fileurl: { url: newSection.secure_url, publicId: newSection.public_id },
      }
    );
    return response.json({
      status: "Success",
      message: "Section Pdf Updated Scuuefully",
    });
  } else {
    return response.json({ status: "Error", message: "No File To Upload" });
  }
};
module.exports = updateSectionPdf;
