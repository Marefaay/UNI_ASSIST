const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");

const viewLecturAttendanceForStudent = async (request, response) => {
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
    subject.lectureAttendance.forEach((std) => {
      if (std.student === student.name) {
        const lectureRow = {
          subject: title,
          type: "Lecture",
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
            lectureRow.week1 = "present";
            lectureRow.total++;
          }
          if (std.week[i] == 2) {
            lectureRow.week2 = "present";
            lectureRow.total++;
          }
          if (std.week[i] == 3) {
            lectureRow.week3 = "present";
            lectureRow.total++;
          }
          if (std.week[i] == 4) {
            lectureRow.week4 = "present";
            lectureRow.total++;
          }
          if (std.week[i] == 5) {
            lectureRow.week5 = "present";
            lectureRow.total++;
          }
          if (std.week[i] == 6) {
            lectureRow.week6 = "present";
            lectureRow.total++;
          }
          if (std.week[i] == 7) {
            lectureRow.week7 = "present";
            lectureRow.total++;
          }
        }
        console.log(lectureRow);
        attendanceArray.push(lectureRow);
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
module.exports = viewLecturAttendanceForStudent;
