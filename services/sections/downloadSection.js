const sectionModel = require("../../models/section");

const downloadSection = async (request, response) => {
  //params
  const { id } = request.params;
  //find section
  const section = await sectionModel.findOne({ _id: id });
  //section not exist
  if (!section) {
    return response.json({
      status: "Error",
      message: "This Section Is Not Found",
    });
  }
  //Section exist
  //Section Url
  const sectionUrl = section.fileUrl.url;
  //response
  return response.json({ status: "Success", message: "Success", sectionUrl });
};
module.exports = downloadSection;
