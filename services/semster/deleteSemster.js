const semesterModel = require("../../models/semster");
const yearModel = require("../../models/years");

const deleteSemster = async (request, response) => {
  try {
    const { id } = request.params;

    // Find the semester
    const semester = await semesterModel.findOne({ _id: id });

    // Semester not found
    if (!semester) {
      return response.json({
        status: "Error",
        message: "Semester Not Found",
      });
    }

    // Find all years that might contain this semester
    const years = await yearModel.find({ semesters: semester.semesterNo });

    // Loop through all years and remove the semester
    years.forEach(async (year) => {
      const index = year.semesters.indexOf(semester.semesterNo);
      if (index > -1) {
        year.semesters.splice(index, 1);
        await year.save();
      }
      console.log(year)
    });
    // Remove the semester from the semesterModel
    await semesterModel.deleteOne({ _id: id });

    return response.json({
      status: "Success",
      message: "Semester deleted successfully",
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};

module.exports = deleteSemster;
