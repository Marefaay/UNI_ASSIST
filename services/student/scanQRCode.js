const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");

const scanQrCode = async (request, response) => {
  const { type, subjectName, week } = request.body;

  // Validate week number
  if (week < 1 || week > 7) {
    return response.json({
      status: "Error",
      message: "Week number must be between 1 and 7",
    });
  }

  try {
    // Find subject
    const subject = await subjectModel.findOne({ title: subjectName });
    if (!subject) {
      return response.json({
        status: "Error",
        message: "Subject Not Found",
      });
    }

    // Find student
    const student = await studentModel.findOne({ _id: request.id });
    if (!student) {
      return response.json({
        status: "Error",
        message: "Student Not Found",
      });
    }

    // Function to record attendance
    const recordAttendance = async (attendanceType) => {
      let attendance =
        attendanceType === "section"
          ? subject.sectionAttendance
          : subject.lectureAttendance;
      let attendanceField =
        attendanceType === "section"
          ? "sectionAttendance"
          : "lectureAttendance";

      // Check if the student has already recorded attendance for this week
      let studentRecord = attendance.find(
        (record) => record.student === student.name
      );
      if (studentRecord) {
        if (studentRecord.week.includes(week)) {
          return response.json({
            status: "Error",
            message: `You have already recorded attendance for week ${week}`,
          });
        } else {
          studentRecord.week.push(week);
        }
      } else {
        // Add new attendance record for the student
        attendance.push({ student: student.name, week: [week] });
      }

      // Save the updated subject
      await subjectModel.findOneAndUpdate(
        { title: subject.title },
        { $set: { [attendanceField]: attendance } },
        { new: true }
      );

      return response.json({
        status: "Success",
        message: "Attendance Recorded Successfully",
      });
    };

    // Record attendance based on the type
    if (type.toLowerCase() === "section") {
      return await recordAttendance("section");
    } else if (type.toLowerCase() === "lecture") {
      return await recordAttendance("lecture");
    } else {
      return response.json({
        status: "Error",
        message: "Invalid type. Must be either 'section' or 'lecture'",
      });
    }
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};

module.exports = scanQrCode;
