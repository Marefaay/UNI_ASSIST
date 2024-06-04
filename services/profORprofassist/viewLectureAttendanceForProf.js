//ok
const express = require("express");
const json2xls = require("json2xls");
const fs = require("fs");
const subjectModel = require("../../models/subject");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const os = require("os");
const path = require("path");
const app = express();

// Middleware to convert JSON to Excel format
app.use(json2xls.middleware);

const viewLectureAttendance = async (request, response) => {
  try {
    let jsonData = [];
    const { title } = request.body;

    // Find subject
    const subj = await subjectModel.findOne({ title });

    // Find professor or professor assistant
    const prof = await profOrProfAssistModel.findOne({ _id: request.id });

    // Check if user role is prof or professor assistant
    if (prof.role !== "prof-profAssist") {
      return response.json({
        status: "Error",
        message: "This user does not have access.",
      });
    }
    ///if subject not found
    if (!subj) {
      return response.json({
        status: "Error",
        message: "Subject is not found",
      });
    }
    console.log(prof.subject);
    // Check if professor teaches this subject
    const subjectIncluded = prof.subject.includes(subj.title);
    console.log(subjectIncluded);
    if (!subjectIncluded) {
      return response.json({
        status: "Error",
        message: "This professor does not teach this subject.",
      });
    }
    //if no lecture attendane
    if (subj.lectureAttendance.length == 0) {
      return response.json({
        status: "Error",
        message: "No lecture Attendance",
      });
    }
    subj.lectureAttendance.forEach((std) => {
      let student = std;
      const row = {
        subject: subj.title,
        type: "lecture",
        name: student.student,
        week1: "absent",
        week2: "absent",
        week3: "absent",
        week4: "absent",
        week5: "absent",
        week6: "absent",
        week7: "absent",
        total: 0,
      };
      console.log(std.week);
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

      jsonData.push(row);

      // jsonData = [
      //   {
      //     subject: subj.title,
      //     type: "lecture",
      //     name:[std.student],
      //     week1: "absent",
      //     week2: "absent",
      //     week3: "absent",
      //     week4: "absent",
      //     week5: "absent",
      //     week6: "absent",
      //     week7: "absent",
      //     total: 0,
      //   }

      //   // ... Add more data as needed
      // ];
    });
    // Generate attendance data

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
      `Lecture Attendace for ${title} subject ${date}.xlsx`
    );
    // const filePath = "./example.xlsx";
    fs.writeFileSync(filePath, xls, "binary");

    // Send the file as a download
    response.download(filePath, (err) => {
      if (err) {
        console.error(err);
        return response.json({
          status: "Error",
          message: "An error occurred while downloading the file.",
        });
      }

      // Delete the file after it has been sent
      // fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    return response.json({
      status: "Error",
      message: "An error occurred while generating the Excel file.",
    });
  }
};

module.exports = viewLectureAttendance;
