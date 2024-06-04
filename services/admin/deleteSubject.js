const profOrProfAssistModel = require("../../models/prof-profAssist");
const subjectModel = require("../../models/subject");

const delteSubject = async (request, response) => {
  const { id } = request.params;
  //find subject
  const subject = await subjectModel.findOne({ _id: id });
  if (subject) {
    //delte subject
    // await subjectModel.deleteOne({ _id: id });
    //delte from prof or prof assist
    console.log(subject.title);
    const prof = await profOrProfAssistModel.find({ subject: subject.title });
    // console.log(prof.);/
    prof.forEach((pro) => {
      const subjectIndex = pro.subject.indexOf(subject.title);
      //delte index
      console.log(pro.subject.slice(subjectIndex));
    });
    // prof.subject.pop(subject.title);
    //delte lecture and sections @@@TODO
    return response.json({
      status: "Success",
      message: `Subject delted succefully`,
    });
  } else {
    return response.json({
      status: "Error",
      message: `No Subject With this ID ('${id}')`,
    });
  }
};
module.exports = delteSubject;
