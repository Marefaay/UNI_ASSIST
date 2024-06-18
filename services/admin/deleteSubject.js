const lectureModel = require("../../models/lecture");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const sectionModel = require("../../models/section");
const subjectModel = require("../../models/subject");

const delSubj = async (reqeust, response) => {
  try {
    const { ID } = reqeust.body;
    //find subject
    const subject = await subjectModel.findOne({ ID });
    console.log(subject.title);
    //Subject Not Exist
    if (!subject) {
      return response.json({
        status: "Error",
        message: "Subject Is Not Found",
      });
    }
    //Subject Is Exist
    //delete subject
      await subjectModel.deleteOne({ ID });
    const prof = await profOrProfAssistModel.find({ subject: subject.title });
    console.log(prof);
    prof.forEach(async (prof) => {
      const cont = prof.subject.includes(subject.title);
      if (cont) {
        //find index of subject
        let indexOfSubject = prof.subject.indexOf(subject.title);
        console.log(indexOfSubject);
        // if found
        if (indexOfSubject > -1) {
          //remove lecture
          prof.subject.splice(indexOfSubject, 1);
          await prof.save();
        }
      }
      console.log(prof);
    });

    //delte lectures
    subject.lectures.forEach(async (lecture) => {
      console.log(lecture);
      const lec = await lectureModel.findOne({ _id: lecture });
      if (!lec) {
        return response.json({
          status: "Error",
          message: "Lecture Is Not Found",
        });
      }
      await lectureModel.deleteOne({ _id: lecture });
    });
    //delte sections
    subject.sections.forEach(async (section) => {
      console.log(section);
      const sec = await sectionModel.findOne({ _id: section });
      if (!sec) {
        return response.json({
          status: "Error",
          message: "Section Is Not Found",
        });
      }
      await sectionModel.deleteOne({ _id: section });
    });
    //response
    return response.json({
      status: "Success",
      message: "Subject Delete Succefully",
    });
  } catch (err) {
    return response.json({ status: "Error", message: err.message });
  }
};
module.exports = delSubj;
