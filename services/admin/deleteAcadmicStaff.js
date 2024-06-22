const profOrProfAssistModel = require("../../models/prof-profAssist");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");
const lectureModel = require("../../models/lecture");
const sectionModel = require("../../models/section");
const postModel = require("../../models/post");

const deleteAcadmicStaff = async (request, response) => {
  try {
    const { email } = request.body;

    // Find academic staff member
    const acadmicStaffMember = await profOrProfAssistModel.findOne({ email });
    if (!acadmicStaffMember) {
      return response.json({
        status: "Error",
        message: "Academic Staff Member does not exist",
      });
    }

    // Remove profile photo from Cloudinary if it exists
    if (acadmicStaffMember.profilePhoto && acadmicStaffMember.profilePhoto.publicId) {
      await removeFromCloudinary(acadmicStaffMember.profilePhoto.publicId);
    }

    // Remove posts published by the staff member
    await postModel.deleteMany({ publisher: acadmicStaffMember._id });

    // Remove lectures added by the staff member
    await lectureModel.deleteMany({ addedBy: acadmicStaffMember._id });

    // Remove sections added by the staff member
    await sectionModel.deleteMany({ addedBy: acadmicStaffMember._id });

    // Remove the staff member from the database
    await profOrProfAssistModel.deleteOne({ email });

    // Respond with success message
    return response.json({
      status: "Success",
      message: `Academic Staff Member with email '${email}' deleted successfully`,
    });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error(error);
    return response.json({
      status: "Error",
      message: "An error occurred while deleting the academic staff member",
    });
  }
};

module.exports = deleteAcadmicStaff;
