const adminModel = require("../../models/admin");
const studentModel = require("../../models/student");
const deleteStudentsAtSpecificLevel = async (request, response) => {
  try {
    const { level } = request.body;
    //find admin
    const admin = await adminModel.findOne({ _id: request.id });
    console.log(admin);
    //admin not found
    if (!admin) {
      return response.json({ status: "Error", message: "Admin Is Not Found" });
    }
    //find students
    const students = await studentModel.find({ level: level });
    console.log(students);
    //No students In this level
    if (students.length == 0) {
      return response.json({
        status: "Error",
        message: `No Students In Level ${level}`,
      });
    }
    //student exist
    await studentModel.deleteMany({ level: level });
    //response
    return response.json({
      status: "Success",
      message: `All Students with Level ${level} are retrived Succfully `,
      students,
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = deleteStudentsAtSpecificLevel;
