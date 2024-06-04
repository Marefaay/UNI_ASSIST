// const excel = require("exceljs");
// const subjectModel = require("../../models/subject");
// const studentModel = require("../../models/student");
// const attendance = async (request, response) => {
//   const workBook = new excel.Workbook();
//   const workSheet = workBook.addWorksheet("Attendance");
//   const subject = await subjectModel.find({});
//   // workSheet.mergeCells("B1","C1","D1")
//   // workSheet.mergeCells(1,2,3,4)
//   workSheet.columns = [
//     // { header: "Student name", key: "Student name", width: 50 },
//     { header: "subject", key: "subjects", width: 50 },
//     { header: "W1", key: "W1", width: 10 },
//     { header: "w2", key: "w2", width: 10 },
//     { header: "w3", key: "w3", width: 10 },
//     { header: "w4", key: "w4", width: 10 },
//     { header: "w5", key: "w5", width: 10 },
//     { header: "w6", key: "w6", width: 10 },
//     { header: "w7", key: "w7", width: 10 },
//   ];

//   const student = await studentModel.find({ _id: request.id });
//   console.log(student);
//   // const student
//   subject.forEach((sub) => {
//     workSheet.addRow({ subjects: sub.title });
//     // console.log(sub);
//     sub.lectureAttendance.forEach((std) => {
//       student.forEach((stud) => {
//         console.log(stud.name);
//         if (std.student == stud.name) {
//          workSheet.addRow({w1:"Prestn"})
//         } else {
//           console.log("NO");
//         }
//       });
//     });
//   });

//   await workBook.xlsx.writeFile("File.xlsx");
//   response.json({ Message: "OK" });
// };
// module.exports = attendance;
