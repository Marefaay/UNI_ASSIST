const subjectModel = require("../../models/subject");

const updateSubject = async (request, response) => {
  const { title, ID, numberOfHours } = request.body;
  const { id } = request.params;
  //findOne
  const subject = await subjectModel.findOne({ _id: id });
  if (subject) {
    await subjectModel.updateOne({ _id: id }, { title, ID, numberOfHours });
    return response.json({
      status: "Success",
      message: `Subject('${subject.title}') Updated Succefully`,
    });
  } else {
    return response.json({
      status: "Error",
      message: `No Subject With this  ('${subject.title}')`,
    });
  }
};
module.exports = updateSubject;
