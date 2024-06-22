const semesterModel = require("../../models/semster");
const yearModel = require("../../models/years");
const subjectModel = require("../../models/subject");
const lectureModel = require("../../models/lecture");

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
    //delete semsters from years
    // Find all years that might contain this semester
    const years = await yearModel.find({});

    // Loop through all years and remove the semester
    years.forEach(async (year) => {
      const yearContainedSemster = year.semesters.includes(id);
      console.log(yearContainedSemster);
      if (yearContainedSemster) {
        const index = year.semesters.indexOf(id);
        if (index > -1) {
          year.semesters.splice(index, 1);
          await year.save();
        }
        console.log(year);
      }
    });
    //delete subjects from semster
    semester.subjects.forEach(async (subject) => {
      // const subject = await subjectModel.findOne({ _id: subject });
      //delete lectures
      await lectureModel.deleteOne({ subject: subject });
      ///delete subject from db
      await subjectModel.deleteOne({ _id: subject });
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
