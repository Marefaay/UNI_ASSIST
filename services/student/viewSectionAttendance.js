const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");
const fs = require("fs");
const json2csv = require("json2csv");
const viewSectionAttendance = async (request, response) => {
  const { title } = request.body;
  //find subject
  const subject = await subjectModel.findOne({ title });
  const student = await studentModel.findById(request.id);
  //   console.log(subject.lectureAttendance,student.name);
  if (subject) {
    let data = [];
    subject.sectionAttendance.forEach((std) => {
      if (std.student == student.name) {
        data.push({
          student: std.student,
          sectionNo:std.sectionNo,
          date: std.date,
          group: std.group,
          department: std.department,
          location: std.location,
          lecturerName: std.lecturerName,
          scannedTime: std.scannedTime,
        });                    
        console.log(data);
        //create excel file
        const csv = json2csv.parse(data);
        console.log(csv);
        fs.writeFile(`${title}SectionAttendanceFor${student.name}.csv`, csv, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Congratulations");
          }
        });
      } else {
        // console.log("No student with this name");
        response.json({message:`${student.name} did not attend any lecture `})
      }
    });
    response.json({ message: "OK" });
  } else {
    response.json({ message: `Subject with title ('${title}') not found` });
  }
};
module.exports = viewSectionAttendance;
