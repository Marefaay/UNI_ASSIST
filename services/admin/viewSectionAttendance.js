const subjectModel = require("../../models/subject");

const viewSectionAttendance = async (request, response) => {
  const { title } = request.body;
  //find subject
  const subject = await subjectModel.findOne({ title: title });
  let attendanceArray = [];

  //subject not found
  if (!subject) {
    return response.json({ status: "Error", message: "Subject Is Not Found" });
  }
  //   subject Is Found
  subject.sectionAttendance.forEach(async (std) => {
    const row = {
      subject: title,
      type: "section",
      name: std.student,
      week1: "absent",
      week2: "absent",
      week3: "absent",
      week4: "absent",
      week5: "absent",
      week6: "absent",
      week7: "absent",
      total: 0,
    };
    console.log(std);
    console.log(std.week);
    //record attendance
    for (let i = 0; i < std.week.length; i++) {
      console.log(std.week[i]);
      if (std.week[i] == 1) {
        row.week1 = "present";
        row.total++;
      }
      if (std.week[i] == 2) {
        row.week2 = "present";
        row.total++;
      }
      if (std.week[i] == 3) {
        row.week3 = "present";
        row.total++;
      }
      if (std.week[i] == 4) {
        row.week4 = "present";
        row.total++;
      }
      if (std.week[i] == 5) {
        row.week5 = "present";
        row.total++;
      }
      if (std.week[i] == 6) {
        row.week6 = "present";
        row.total++;
      }
      if (std.week[i] == 7) {
        row.week7 = "present";
        row.total++;
      }
    }
    console.log(row);
    attendanceArray.push(row);
    // await attendanceArray.save();
  });
  return response.json({
    status: "Success",
    message: "Attendance Retrived Succefully",
    attendanceArray,
  });
};
module.exports = viewSectionAttendance;
