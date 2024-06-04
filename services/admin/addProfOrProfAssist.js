const adminModel = require("../../models/admin");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const bcrypt = require("bcrypt");
const addProfOrProfAssist = async (request, response) => {
  const { name, email, subject, password } = request.body;
  //find admin
  const admin = await adminModel.findOne({ _id: request.id });
  console.log(admin);
  //find name
  const profOrProfAssistName = await profOrProfAssistModel.findOne({ name });
  //find email
  const profORProfAssistEmail = await profOrProfAssistModel.findOne({ email });
  //Check On Name
  if (!profOrProfAssistName) {
    //name not exist
    //Check On Email
    if (!profORProfAssistEmail) {
      //email not exist
      //hashing Password
      bcrypt.hash(password, 4, async (err, hash) => {
        //add to db
        const profOrProfAssist = await profOrProfAssistModel.insertMany({
          name,
          email,
          subject,
          password: hash,
          addedBy: admin.name,
        });
        return response.json({
          status: "Success",
          message: `Congratulations ('${name}') You Are Registred Succefully`,
          profOrProfAssist,
        });
      });
    } else {
      //emaill is exist
      return response.json({
        status: "Error",
        message: `('${email}') This Email Is Already Exist`,
      });
    }
  } else {
    //name is exist
    return response.json({
      status: "Error",
      message: `('${name}') This Name Is Already Exist`,
    });
  }
};
module.exports = addProfOrProfAssist;
