const profOrProfAssistModel = require("../../models/prof-profAssist");
const deleteAcadmicStaff = async (request, response) => {
  const { email } = request.body;
  //find acadmic staff member
  const acadmicStaffMember = await profOrProfAssistModel.findOne({
    email,
  });
  //Acadamic Staff Member Is not Exist
  if (!acadmicStaffMember) {
    return response.json({
      status: "Error",
      message: "Acadmic Staff Member is Not Exist",
    });
  }
  //delete Acadmic Staff
  await profOrProfAssistModel.deleteOne({ email });
  //Acadamic Staff Member Is  Exist
  return response.json({
    status: "Success",
    message: `Acadmic Staff With Email ('${email}') Deleted Succefully`,
  });
};
module.exports = deleteAcadmicStaff;
