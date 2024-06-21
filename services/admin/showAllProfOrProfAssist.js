const adminModel = require("../../models/admin");
const profOrProfAssistModel = require("../../models/prof-profAssist");

const showAllProfOrProfAssist = async (request, response) => {
  //find admin
  const admin = await adminModel.findOne({ _id: request.id });
  //admin Not Exist
  if (!admin) {
    return response.json({ status: "Error", message: "Admin Is Not Found" });
  }
  //admin Exist
  //find All profOrProfAsistants
  const acadmicSatff = await profOrProfAssistModel.find({});
  //No Acadmic Staff Are Exist
  if (acadmicSatff.length == 0) {
    return response.json({ status: "Error", message: "No Acadmic Staff" });
  }
  //acadmic staff are exist
  return response.json({
    status: "Success",
    message: "All Acadmic Staff Are Retrived",
    acadmicSatff,
  });
};
module.exports = showAllProfOrProfAssist;
