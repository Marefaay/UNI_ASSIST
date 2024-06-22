const semesterModel = require("../../models/semster");
const yearModel = require("../../models/years");

const deleteYear = async (request, response) => {
  try {
    const { id } = request.params;
    const year = await yearModel.findOne({ _id: id });
    console.log(year);
    //no year with same id
    if (!year) {
      return response.json({ status: "Error", message: "Year Not Found" });
    }
    //delete semster
    year.semesters.forEach(async (semster) => {
      const semester = await semesterModel.findOne({ _id: semster });
      //delete subjects from semster
      semester.subjects.forEach(async (subject) => {
        // const subject = await subjectModel.findOne({ _id: subject });
        //delete lectures
        await lectureModel.deleteOne({ subject: subject });
        //delete subject
        await subjectModel.deleteOne({ _id: subject });
      });
      //delete semster from db
      await semesterModel.deleteOne({ _id: semster });
    });
    //delte year
    await yearModel.deleteOne({ _id: id });

    response.json({
      status: "success",
      message: `Year ${year.yearNo} deleted successfully`,
    });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
module.exports = deleteYear;
