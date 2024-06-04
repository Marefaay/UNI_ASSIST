//OK
const gradautionStudentModel = require("../../models/gaduationStudent");
const studentModel = require("../../models/student");

const moveToGraduationLevel = async (request, response) => {
  try {
    const graduaionStudent = [];
    const studentLevel4 = await studentModel.find({ level: 4 });

    studentLevel4.forEach((student) => {
      student.level = "Graduation Level";
      graduaionStudent.push(student);
    });

    if (graduaionStudent.length === 0) {
      return response.json({
        status: "Error",
        message: "No level 4 Student to be moved",
      });
    }

    const studentsToInsert = [];
    const studentsToDelete = [];

    for (const student of graduaionStudent) {
      const existingStudent = await gradautionStudentModel.findOne({
        $or: [{ name: student.name }, { email: student.email }],
      });

      if (existingStudent) {
        if (existingStudent.name === student.name) {
          return response.json({
            status: "Error",
            message: "Student Name Already Exists in Graduation Student",
          });
        } else if (existingStudent.email === student.email) {
          return response.json({
            status: "Error",
            message: "Student Email Already Exists in Graduation Student",
          });
        }
      } else {
        studentsToInsert.push(student);
        studentsToDelete.push({ _id: student._id });
      }
    }

    if (studentsToInsert.length > 0) {
      const insertedStudents = await gradautionStudentModel.insertMany(studentsToInsert);
      await studentModel.deleteMany({ $or: studentsToDelete });
      
      return response.json({
        status: "Success",
        message: "Students moved successfully",
        students: insertedStudents,
      });
    } else {
      return response.json({
        status: "Error",
        message: "All Level 4 Students Already Exist in Graduation Student",
      });
    }
  } catch (error) {
    console.error("Error in moveToGraduationLevel:", error);
    return response.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

module.exports = moveToGraduationLevel;
