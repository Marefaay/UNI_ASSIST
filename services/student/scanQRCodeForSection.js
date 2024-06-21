const studentModel = require("../../models/student");
const subjectModel = require("../../models/subject");

const scanQRCodeForSection = async (request, response) => {
  const {
    type,
    subjectName,
    week,
   
    department,
    location,
    lecturereName,
  } = request.body;
  //find subject
  //find subject that want to record attendance for it
  const subject = await subjectModel.findOne({
    title: subjectName,
  });

  if (subject) {
    //find student that want to record attendance
    const student = await studentModel.findOne({ _id: request.id });
    if (!student) {
      return response.json({
        status: "Error",
        message: "Student Is Not Found",
      });
    }
    //check if type is lecture
    if (type.toLowerCase() === "section") {
      //check if there is an attendance for lecture
      if (subject.sectionAttendance.length === 0) {
        //there is no attendance for lecture so add student to it
        await subjectModel.findOneAndUpdate(
          { title: subject.title },
          {
            $push: {
              sectionAttendance: {
                student: student.name,
                week: week,
              
                department: department,
                location: location,
                lecturerName: lecturereName,
              },
            },
          },
          { new: true }
        );

        return response.json({
          status: "Success",
          message: "Attendance Recorded Successfully",
        });
      } else {
        //loop for all students in lecture attendance
        for (const std of subject.sectionAttendance) {
          //check if student that want to record attendance is already exist
          if (std.student === student.name) {
            //loop for the weeks that he record attendance on it
            for (const w of std.week) {
              //check if student redor attendance for this week
              if (w === week) {
                return response.json({
                  status: "Error",
                  message: "You have already recorded attendance for this week",
                });
              }
            }
            //if not record attendance
            std.week.push(week);
            await subject.save();
            return response.json({
              status: "Success",
              message: "Attendance Recorded Successfully",
            });
          }
        }
        //if student is not reocrd attendance before
        await subjectModel.findOneAndUpdate(
          { title: subject.title },
          {
            $push: {
              sectionAttendance: {
                student: student.name,
                week: week,
                
                department: department,
                location: location,
                lecturerName: lecturereName,
              },
            },
          },
          { new: true }
        );
        return response.json({
          status: "Success",
          message: "Attendance Recorded Successfully",
        });
      }
    }
  } else {
    //check if there is an attendance for section

    return response.json({ status: "Error", message: "Subject Not Found" });
  }
};
module.exports = scanQRCodeForSection;
