const semesterModel = require("../../models/semster");
const yearModel = require("../../models/years");

const addSemster = async (request, response) => {
  try {
    const { semesterNo, yearNo, subjects } = request.body;
    //find year
    const year = await yearModel.findOne({ yearNo: yearNo });
    ///find semseter
    // console.log(year);
    const semesterExists = await semesterModel.findOne({ semesterNo, yearNo });
    if (semesterExists) {
      return response.json({ status: "ُError", message: "Semster is exist" });
    }
    ///year not found
    if (!year) {
      return response.json({
        status: "Error",
        message: `No Year with number ${yearNo}`,
      });
    }
    // console.log(year);
    // //no semeters on this year
    if (year.semesters.length == 0) {
      //add semster to semsters collecion
      const semester = await semesterModel.insertMany({
        semesterNo,
        yearNo,
        subjects,
      });
      // console.log(semester[0]._id);
      //add semster to year semsters
      year.semesters.push(semester[0]._id);
      await year.save();
      return response.json({
        status: "Success",
        message: "Semster add succefullly",
        semester,
      });
    }

    //if semster already exist
    if (year.semesters.includes(semesterNo)) {
      return response.json({
        status: "Error",
        message: "This semster already exist",
      });
    }
    //not exist
    const sems = await semesterModel.insertMany({
      semesterNo,
      yearNo,
      subjects,
    });
    console.log(sems[0]._id);

    year.semesters.push(sems[0]._id);

    await year.save();
    //find semseter
    const sem = await semesterModel.findOne({ _id: sems[0]._id });
    console.log(sem);
    return response.json({
      status: "Success",
      message: "Semster added succefully",
      sem,
    });
  } catch (err) {
    response.json({ status: "Error", message: err.message });
  }
};
module.exports = addSemster;
