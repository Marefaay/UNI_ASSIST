const QrCode = require("qrcode-reader");
const jimp = require("jimp");
const fs = require("fs");
const subjectModel = require("../../models/subject");
const studentModel = require("../../models/student");
//business logic
const scanQRCode = async (request, response) => {
  //check if qr code be sent
  if (request.file) {
    //error handling
    try {
      //read qr code
      const buffer = fs.readFileSync(
        __dirname + `../../../QRCodes/${request.file.filename}`
      );
      //read qr code as a buffer
      const image = await jimp.read(buffer);
      const qrcode = new QrCode();

      qrcode.callback = async (err, value) => {
        if (err) {
          console.error(err);
          return response.json({ message: "Invalid QR Code", error: err });
        } else {
          //convert data from string to json
          const resultData = await JSON.parse(value.result);
          console.log(resultData)
          //find subject that want to record attendance for it
          const subject = await subjectModel.findOne({
            title: resultData.subjectName,
          });

          if (subject) {
            //find student that want to record attendance
            const student = await studentModel.findOne({ _id: request.id });
            //check if type is lecture
            if (resultData.type.toLowerCase() === "lecture") {
              //check if there is an attendance for lecture
              if (subject.lectureAttendance.length === 0) {
                //there is no attendance for lecture so add student to it
                await subjectModel.findOneAndUpdate(
                  { title: subject.title },
                  {
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
                  { new: true }
                );

                return response.json({
                  message: "Attendance Recorded Successfully",
                });
              } else {
                //loop for all students in lecture attendance
                for (const std of subject.lectureAttendance) {
                  //check if student that want to record attendance is already exist
                  if (std.student === student.name) {
                    //loop for the weeks that he record attendance on it
                    for (const w of std.week) {
                      //check if student redor attendance for this week
                      if (w === resultData.week) {
                        return response.json({
                          message:
                            "You have already recorded attendance for this week",
                        });
                      }
                    }
                    //if not record attendance
                    std.week.push(resultData.week);
                    await subject.save();
                    return response.json({
                      message: "Attendance Recorded Successfully",
                    });
                  }
                }
                //if student is not reocrd attendance before
                await subjectModel.findOneAndUpdate(
                  { title: subject.title },
                  {
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
                  { new: true }
                );
                return response.json({
                  message: "Attendance Recorded Successfully",
                });
              }
            }
           
          } else {
            //check if there is an attendance for section
           
            return response.json({ message: "Subject Not Found" });
          } 
        }
      };

      qrcode.decode(image.bitmap);
      fs.unlinkSync(__dirname + `../../../QRCodes/${request.file.filename}`);
    } catch (error) {
      console.error(error);
      return response.json({ message: "Error scanning QR Code", error });
    }
  } else {
    return response.json({ message: "No QR Code to Scan" });
  }
};

module.exports = scanQRCode;
