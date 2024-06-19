const viewLectureAttendance = async (request, response) => {
  try {
    const { title } = request.body;

    // Find subject
    const subject = await subjectModel.findOne({ title });

    // If subject not found
    if (!subject) {
      return response.status(404).json({
        status: "Error",
        message: "This Subject Is Not Found",
      });
    }

    // If no attendance recorded
    if (subject.lectureAttendance.length === 0) {
      return response.status(404).json({
        status: "Error",
        message: "No Lecture Attendance",
      });
    }

    // Generate attendance data
    const attendanceData = subject.lectureAttendance.map((std) => ({
      subject: subject.title,
      type: "lecture",
      name: std.student,
      week1: std.week[0] ? "present" : "absent",
      week2: std.week[1] ? "present" : "absent",
      week3: std.week[2] ? "present" : "absent",
      week4: std.week[3] ? "present" : "absent",
      week5: std.week[4] ? "present" : "absent",
      week6: std.week[5] ? "present" : "absent",
      week7: std.week[6] ? "present" : "absent",
      total: std.week.filter(Boolean).length,
    }));

    // Convert attendance data to Excel format
    const xls = json2xls(attendanceData);

    // Set the appropriate headers for the response
    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      `attachment; filename=Lecture Attendance for ${title} subject ${new Date().toISOString().replace(/:/g, "-")}.xlsx`
    );

    // Send the Excel file as the response
    response.send(xls);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      status: "Error",
      message: "An error occurred while generating the Excel file.",
    });
  }
};
