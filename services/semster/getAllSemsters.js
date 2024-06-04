const semesterModel = require("../../models/semster");

const getAllSemsters = async (request, response) => {
  try {
    ///find all semsters
    const semesters = await semesterModel.find({}).populate("subjects", {
      lectureAttendance: 0,
      sectionAttendance: 0,
      addedBy: 0,
      numberOfHours: 0,
      ID: 0,
      teachedBy: 0,
      __v: 0,
    });
    console.log(semesters);
    //if no semsters
    if (semesters.length == 0) {
      return response.json({ sataus: "Error", message: "No semsters" });
    }
    //get lectures sections
    //response
    return response.json({
      status: "Sucess",
      message: "Semesters retrieved successfully",
      semesters,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = getAllSemsters;
