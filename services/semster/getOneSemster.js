const adminModel = require("../../models/admin");
const semesterModel = require("../../models/semster");

const getOneSemster = async (request, response) => {
  try {
    const { id } = request.params;
    //find admin
    const admin = await adminModel.findOne({ _id: request.id });
    //admin not exist
    if (!admin) {
      return response.json({ status: "Error", message: "Admin Is Not Found" });
    }
    ///find semster
    const semester = await semesterModel
      .findOne({ _id: id })
      .populate("subjects", {
        lectureAttendance: 0,
        sectionAttendance: 0,
        addedBy: 0,
        numberOfHours: 0,
        ID: 0,
        teachedBy: 0,
        __v: 0,
      });
    ///Semster Not found
    if (!semester) {
      return response.json({ status: "Error", message: "Semester not found" });
    }
    ///get lecture and section
    //response
    return response.json({
      status: "Success",
      message: "Semester retrieved successfully",
      semester,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = getOneSemster;
