const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");

const viewLectureAttendanceForStudent = async (request, response) => {
  try {
    const { id } = request.params;
    const errors = [];
    const attendanceArray = [];

    // Find student
    const student = await studentModel.findOne({ _id: request.id });
    if (!student) {
      return response.json({
        status: "Error",
        message: "Student Is Not Found",
      });
    }

    // Find subject
    const subject = await subjectModel.findOne({ _id: id });
    if (!subject) {
      return response.json({
        status: "Error",
        message: "Subject Is Not Found",
      });
    }

    // Check lecture attendance
    let studentFound = false;
    subject.lectureAttendance.forEach((std) => {
      if (std.student === student.name) {
        studentFound = true;
        const lectureRow = {
          subject: subject.title,
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

        // Record attendance
        std.week.forEach((week) => {
          if (week == 1) lectureRow.week1 = "present";
          if (week == 2) lectureRow.week2 = "present";
          if (week == 3) lectureRow.week3 = "present";
          if (week == 4) lectureRow.week4 = "present";
          if (week == 5) lectureRow.week5 = "present";
          if (week == 6) lectureRow.week6 = "present";
          if (week == 7) lectureRow.week7 = "present";
          lectureRow.total++;
        });

        attendanceArray.push(lectureRow);
      }
    });

    if (!studentFound) {
      errors.push(`Student ${student.name} Didn't Attend Any Lecture`);
    }

    if (errors.length > 0) {
      return response.json({ status: "Error", message: errors });
    }

    // Successful response
    return response.json({
      status: "Success",
      message: "Attendance Retrieved Successfully",
      attendanceArray,
    });

  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};

module.exports = viewLectureAttendanceForStudent;
