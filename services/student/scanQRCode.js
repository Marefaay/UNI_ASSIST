const QrCode = require("qrcode-reader");
const jimp = require("jimp");
const fs = require("fs");
const subjectModel = require("../../models/subject");
const studentModel = require("../../models/student");
let responseSent = false;
// const { insertMany } = require("../../models/prof-profAssist");
const scanQRCode = async (request, response) => {
  if (request.file) {
    // console.log(request.file);
    //reqd image
    const buffer = fs.readFileSync(
      __dirname + `../../../QRCodes/${request.file.filename}`
    );
    // console.log(buffer);
    //read buffer
    jimp.read(buffer, async (err, image) => {
      // console.log(image);
      if (err) {
        console.error(err);
      } else {
        var qrcode = new QrCode();
        // console.log(qrcode);
        qrcode.callback = async (err, value) => {
          // console.log("GG");
          if (err) {
            console.error(err);
            return response.json({ message: "QR Code Is Not valid", err });
          } else {
            // console.log(value.result);
            const resultData = JSON.parse(value.result);
            // resultData.time="mo"
            console.log(resultData);
            // find subject that name embedded in qr
            const subject = await subjectModel.findOne({
              title: resultData.subjectName,
            });
            // console.log(subject);
            if (subject) {
              // console.log(subject);
              const student = await studentModel.findOne({ _id: request.id });
              //Check If type Is Lecture
              if (
                resultData.type == "Lecture" ||
                resultData.type == "lecture"
              ) {
                //If No Attendance Recorded Before
                if (subject.lectureAttendance.length == 0) {
                  //Record Attendnace
                  const sub = await subjectModel.findOneAndUpdate(
                    { title: subject.title },
                    {
                      //add student data in lecutre attendace array
                      $push: {
                        lectureAttendance: {
                          student: student.name,
                          week: resultData.week,
                          group: resultData.group,
                          department: resultData.department,
                          location: resultData.location,
                          lecturerName: resultData.lecturerName,
                        },
                      },
                    },
                    {
                      new: true,
                    }
                  );
                  return response.json({
                    message: "Attendance Recoreded Succefully",
                  });
                } else {
                  //If There are attendance exist
                  subject.lectureAttendance.forEach(async (std) => {
                    console.log(std.student, student.name);
                    //check if student record attendeance beofre
                    if (std.student == student.name) {
                      //loop on  student week attendance
                      if (std.week.includes(resultData.week)) {
                        //if attendance for this week already recorded
                        console.log("INCLUDED");
                        // return response.send("OK")
                        if (!responseSent) {
                          responseSent = true; // Set the flag to indicate that a response has been sent
                          return response.json({
                            message:
                              "You Already Record This Attendance Before",
                          });
                        }
                       
                      } else {
                        //if attendance for this week not recorded
                        console.log("NOT Included");
                        std.week.push(resultData.week);
                        await subject.save();
                        if (!responseSent) {
                          responseSent = true; // Set the flag to indicate that a response has been sent
                          return response.json({
                            message:
                              "Your attendance for this week recorded Succeufllu",
                          });
                        }
                      }
                    } else {
                      //if student Dosen't exist in attendance
                      console.log("NO");
                      subject.lectureAttendance.push({
                        student: student.name,
                        week: resultData.week,
                        group: resultData.group,
                        department: resultData.department,
                      });
                      // await subject.save();
                      if (!responseSent) {
                        responseSent = true; // Set the flag to indicate that a response has been sent
                        response.json({
                          message: "Your Attendance Recorded Succefully new",
                        });
                      }
                    }

                    //   if (std.student != student.name) {
                    //     console.log(student.name);
                    //     const exist = std.week.includes(resultData.week);
                    //     console.log(exist);
                    //     if (exist) {
                    //       if (!responseSent) {
                    //         responseSent = true; // Set the flag to indicate that a response has been sent
                    //          response.json({
                    //           message:
                    //             "You Already Record This Attendance Before",
                    //         });
                    //       }
                    //     } else {
                    //       std.week.push(resultData.week);
                    //       // subject.lectureAttendance.forEach((std) => {
                    //       // });
                    //       await subject.save();
                    //       // std.week.
                    //       // std.save()
                    //       if (!responseSent) {
                    //         responseSent = true; // Set the flag to indicate that a response has been sent
                    //          response.json({ message: "Attendance Recorded Successfully new" });}
                    //     }
                    //  return;
                    //     // await response.send("FOund")
                    //   } else {
                    //     console.log("NOT EXITS");
                    //     const sub = await subjectModel.findOneAndUpdate(
                    //       { title: subject.title },
                    //       {
                    //         //add student data in lecutre attendace array
                    //         $push: {
                    //           lectureAttendance: {
                    //             student: student.name,
                    //             week: resultData.week,
                    //             group: resultData.group,
                    //             department: resultData.department,
                    //             location: resultData.location,
                    //             lecturerName: resultData.lecturerName,
                    //           },
                    //         },
                    //       },
                    //       {
                    //         new: true,
                    //       }
                    //     );
                    //     if (!responseSent) {
                    //       responseSent = true; // Set the flag to indicate that a response has been sent
                    //        response.json({
                    //         message: "Attendance Recorded Successfully new",
                    //       });
                    //     }

                    //   }
                  });
                }
                // await response.send("OK")
              }
            } else {
              return response.json({ message: "Subject Not found" });
            }
          }
        };
        //delte qr
      }

      qrcode.decode(image.bitmap);
      fs.unlinkSync(__dirname + `../../../QRCodes/${request.file.filename}`);
    });
    ///
  } else {
    return response.json({ message: "No QR Code To Scan" });
  }
};
module.exports = scanQRCode;
