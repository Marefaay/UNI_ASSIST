//ok
const adminModel = require("../../models/admin");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const subjectModel = require("../../models/subject");

//business logic
const addSubject = async (request, response) => {
  const { title, ID, numberOfHours } = request.body;
  //find admin
  const admin = await adminModel.findOne({ _id: request.id });
  //find prof
  const prof = await profOrProfAssistModel.find({subject:title})
 
  //find title in db
  const subjectTitle = await subjectModel.findOne({ title });
  //find id in db
  const subjectID = await subjectModel.findOne({ ID });
  if (!subjectTitle) {
    //if subject title not found
    if (!subjectID) {
      // if subject not found
      //add subject
      const subject = await subjectModel.insertMany({
        title,
        ID,
        numberOfHours,
        teachedBy:prof,
        addedBy: admin.name,
      });
      //response
      return response.json({
        status: "Success",
        message: `Subject ${title} Added Succefully`,
        subject,
      });
    } else {
      //if subject id is already exist
      return response.json({
        status: "Error",
        message: `Subject ID ('${ID}') Is Already Exist`,
      });
    }
  } else {
    //if title is already exist
    return response.json({
      status: "Error",
      message: `Subject Title('${title}')Is Already Exist`,
    });
  }
};
module.exports = addSubject;
