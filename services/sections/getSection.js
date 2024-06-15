const sectionModel = require("../../models/section");

const getSection = async (request, response) => {
  try {
    const { id } = request.params;
    const section = await sectionModel.findOne(
      { _id: id },
      { _id: 0, subject: 0, addedBy: 0, __v: 0 }
    );
    if (!section) {
      return response.json({
        status: "Error",
        message: "This Section Is Not Found",
      });
    } else {
      return response.json({ status: "Success", message: "Section ", section });
    }
  } catch (error) {
    return response.json({ status: "Error", message: error });
  }
};
module.exports = getSection;
