//OK
const adminModel = require("../../models/admin");
const gradautionStudentModel = require("../../models/gaduationStudent");
const bcrypt = require("bcrypt");
//Bussiness Logic
const addGraduationStudent = async (request, response) => {
  const { name, email, level, password, addedBy } = request.body;
  //find admin
  const admin = await adminModel.findOne({ _id: request.id });

  //find name
  const studentName = await gradautionStudentModel.findOne({ name });
  //find email
  const studentEmail = await gradautionStudentModel.findOne({ email });

  if (!studentName) {
    //if name not exist
    if (!studentEmail) {
      //if email not exxist
      //hashing password
      bcrypt.hash(password, 4, async (err, hash) => {
        if (err) {
          return response.json({ status: "Error", message: err });
        } else {
          //Add Student
          const student = await gradautionStudentModel.insertMany({
            name,
            email,
            password: hash,
            addedBy: admin.name,
          });
          //reponse
          return response.json({
            status: "Success",
            message: `Student ('${name}') be added succefully`,
            student,
          });
        }
      });
    } else {
      //if email is exist
      return response.json({
        status: "Error",
        message: "Email is Alreay Exist",
      });
    }
  } else {
    //if name is exist
    return response.json({ status: "Error", message: "Name is alreay exist" });
  }
};
module.exports = addGraduationStudent;
