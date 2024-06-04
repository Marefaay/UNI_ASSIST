const QrCode = require("qrcode-reader");
const jimp = require("jimp");
const fs = require("fs");
const subjectModel = require("../../models/subject");
const studentModel = require("../../models/student");
const scanQRCode = async (request, response) => {
  if (request.file) {
    //Read QR Code and convert it to buffer
    const buffer = fs.readFileSync(
      __dirname + `../../../QRCodes/${request.file.filename}`
    );
    console.log(buffer);
    ///read Buffer
    jimp.read(buffer, async (err, image) => {
      if (err) {
        console.error(err);
      } else {
        // console.log(image);
        var qrcode = new QrCode();
        // console.log(qrcode);
        qrcode.callback = async (err, value) => {
          if (err) {
            return response.json({ message: "QR Code Is Not Valid", err });
          } else {
            //read data in qr code as object
            const resultData = await JSON.parse(value.result);
            //find subject name that embedded in QR
            const subject = await subjectModel.findOne({
              title: resultData.subjectName,
            });
            //Check if subject on db
            if (subject) {
              //Check if type is lecture
              if (
                resultData.type == "Lecture" ||
                resultData.type == "lecture"
              ) {
                //if No Attendance Recorded
                if (subject.lectureAttendance.length == 0) {
                  return response.send("No Attendance");
                } else {
                  const student = await studentModel.findById(request.id);
                  console.log(student.name);
                  //If There is Attendance Recorded
                  subject.lectureAttendance.forEach(async (std) => {
                    //check if student name is exist in lecture Attendance
                    if (std.student == student.name) {
                      console.log("OK");
                      const exist = std.week.includes(resultData.week);
                      console.log(exist);
                      //if student recorded Attendance Before
                      if (exist) {
                        return response.json({
                          message:
                            "You are Already Recorded Attendance For this Week Before",
                        });
                      } else {
                        //if student not record Attendance for this week
                        std.week.push(resultData.week);
                        console.log(std.week);
                        subject.save();
                        return response.json({
                          message:
                            "Attendance For This Week Recorded Succefully",
                        });
                      }
                      // return response.send("OK")
                    }
                    //If student Not Found
                    else {
                      await subjectModel.findOneAndUpdate(
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
                        message: "Your Attendance recorded Succefully",
                      });
                    }
                    // console.log(std.student, student.name);
                  });
                  // return response.json(subject.lectureAttendance);
                }
              }
            } else {
              return response.json({ message: `('${subject}') Is Not Exist` });
            }
            // console.log(resul);
          }
          // return response.j);
        };
        qrcode.decode(image.bitmap);

        // return response.send("OK")
      }
    });
  } else {
    return response.json({ message: "No QR Code To Scan" });
  }
};

module.exports = scanQRCode;
