const express = require("express");
const json2xls = require("json2xls");
const fs = require("fs");
const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");
const os = require("os");
const path = require("path");
const app = express();

// Middleware to convert JSON to Excel format
app.use(json2xls.middleware);
const viewsubjectAttendance = async (request, response) => {
  try {
    let jsonData = [];

    const { title } = request.body;
    //find suject
    const subject = await subjectModel.findOne({ title: title });
    //find student
    const student = await studentModel.findOne({ _id: request.id });
    console.log(student, subject);
    jsonData = [
      {
        subject: subject.title,
        type: "lecture",
        name: student.name,
        week1: "absent",
        week2: "absent",
        week3: "absent",
        week4: "absent",
        week5: "absent",
        week6: "absent",
        week7: "absent",
        total: 0,
      },
      {
        subject: subject.title,
        type: "section",
        name: student.name,
        week1: "absent",
        week2: "absent",
        week3: "absent",
        week4: "absent",
        week5: "absent",
        week6: "absent",
        week7: "absent",
        total: 0,
      },

      // ... Add more data as needed
    ];
    subject.lectureAttendance.forEach((std) => {
      if (std.student == student.name) {
        // console.log(std.week.pop());
        // console.log(std.week.pop());
        // console.log(std.week.length);
        // let i = 1;
        for (let i = 0; i < std.week.length; i++) {
          console.log(std.week[i]);
          if (std.week[i] == 1) {
            jsonData[0].week1 = "present";
            jsonData[0].total++;
          }
          if (std.week[i] == 2) {
            jsonData[0].week2 = "present";
            jsonData[0].total++;
          }
          if (std.week[i] == 3) {
            jsonData[0].week3 = "present";
            jsonData[0].total++;
          }
          if (std.week[i] == 4) {
            jsonData[0].week4 = "present";
            jsonData[0].total++;
          }
          if (std.week[i] == 5) {
            jsonData[0].week5 = "present";
            jsonData[0].total++;
          }
          if (std.week[i] == 6) {
            jsonData[0].week6 = "present";
            jsonData[0].total++;
          }
          if (std.week[i] == 7) {
            jsonData[0].week7 = "present";
            jsonData[0].total++;
          }
        }
      }
    });
    subject.sectionAttendance.forEach((std) => {
      if (std.student == student.name) {
        // console.log(std.week.pop());
        // console.log(std.week.pop());
        // console.log(std.week.length);
        // let i = 1;
        for (let i = 0; i < std.week.length; i++) {
          console.log(std.week[i]);
          if (std.week[i] == 1) {
            jsonData[1].week1 = "present";
            jsonData[1].total++;
          }
          if (std.week[i] == 2) {
            jsonData[1].week2 = "present";
            jsonData[1].total++;
          }
          if (std.week[i] == 3) {
            jsonData[1].week3 = "present";
            jsonData[1].total++;
          }
          if (std.week[i] == 4) {
            jsonData[1].week4 = "present";
            jsonData[1].total++;
          }
          if (std.week[i] == 5) {
            jsonData[1].week5 = "present";
            jsonData[1].total++;
          }
          if (std.week[i] == 6) {
            jsonData[1].week6 = "present";
            jsonData[1].total++;
          }
          if (std.week[i] == 7) {
            jsonData[1].week7 = "present";
            jsonData[1].total++;
          }
        }
      }
    });
    // Generate your JSON data
    console.log(jsonData);

    // Convert JSON to Excel format
    const xls = json2xls(jsonData);

    // Set the appropriate headers for the response
    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=example.xlsx"
    );

    // Send the Excel file as the response
    const date = new Date().toISOString().replace(/:/g, "-");

    const filePath = path.join(
      os.homedir(),
      "Downloads",
      `Section and lecture Attendace for ${title} subject ${date}.xlsx`
    );
    // const filePath = "./example.xlsx";
    fs.writeFileSync(filePath, xls, "binary");

    // Send the file as a download
    response.download(filePath, (err) => {
      if (err) {
        // console.error(err);
        response.json({
          status: "Error",
          message: "An error occurred while downloading the file.",
        });
      }

      // Delete the file after it has been sent
      //   fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    response.json({
      status: "Error",
      message: "An error occurred while generating the Excel file.",
    });
  }
};
module.exports = viewsubjectAttendance;
// app.get('/generate-excel', (req, res) => {
//   try {
//     // Generate your JSON data
//     const jsonData = [
//       { name: 'John Doe', age: 25 },
//       { name: 'Jane Smith', age: 30 },
//       // ... Add more data as needed
//     ];

//     // Convert JSON to Excel format
//     const xls = json2xls(jsonData);

//     // Set the appropriate headers for the response
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');

//     // Send the Excel file as the response
//     res.send(xls);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while generating the Excel file.' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
