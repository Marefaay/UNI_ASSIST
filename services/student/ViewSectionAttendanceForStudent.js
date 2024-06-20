const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");

const viewSectionAttendanceForStudent = async (request, response) => {
  try {
    const { title } = request.body;
    const errors = [];
    const attendanceArray = [];

    //find sstudent
    const student = await studentModel.findOne({ _id: request.id });
    console.log(student);
    //Studet Not Exist
    if (!student) {
      return response.json({
        status: "Error",
        message: "Student Is Not Found",
      });
    }
    //find subject
    const subject = await subjectModel.findOne({ title });
    console.log(subject);
    //subject not exist
    if (!subject) {
      return response.json({
        status: "Error",
        message: "Subject Is Not Found",
      });
    }
    //subject Is Found
    //student exist in lecture attendance of this subject
    //lecture attendance
    subject.sectionAttendance.forEach((std) => {
      if (std.student === student.name) {
        const sectionRow = {
          subject: title,
          type: "Section",
          name: student.name,
          week1: "absent",
          week2: "absent",
          week3: "absent",
          week4: "absent",
          week5: "absent",
          week6: "absent",
          week7: "absent",
          total: 0,
        };
        //record attendance
        for (let i = 0; i < std.week.length; i++) {
          console.log(std.week[i]);
          if (std.week[i] == 1) {
            sectionRow.week1 = "present";
            sectionRow.total++;
          }
          if (std.week[i] == 2) {
            sectionRow.week2 = "present";
            sectionRow.total++;
          }
          if (std.week[i] == 3) {
            sectionRow.week3 = "present";
            sectionRow.total++;
          }
          if (std.week[i] == 4) {
            sectionRow.week4 = "present";
            sectionRow.total++;
          }
          if (std.week[i] == 5) {
            sectionRow.week5 = "present";
            sectionRow.total++;
          }
          if (std.week[i] == 6) {
            sectionRow.week6 = "present";
            sectionRow.total++;
          }
          if (std.week[i] == 7) {
            sectionRow.week7 = "present";
            sectionRow.total++;
          }
        }
        console.log(sectionRow);
        attendanceArray.push(sectionRow);
        return response.json({
          status: "Success",
          message: "Attendace Retrived Succefully",
          attendanceArray,
        });
      }
      errors.push(`Student ${student.name} Didn't Attend Any Lecture`);
    });

    ///show errors
    if (errors.length > 0) {
      return response.json({ status: "error", message: errors });
    }
   
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = viewSectionAttendanceForStudent;
