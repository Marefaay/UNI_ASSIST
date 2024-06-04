//ok
const adminModel = require("../../models/admin");
const studentModel = require("../../models/student");
const bcrypt = require("bcrypt");
//Bussiness Logic
const addStudent = async (request, response) => {
  const { name, email, level, password, addedBy, teachedBy } = request.body;
  //find admin
  const admin = await adminModel.findOne({ _id: request.id });
  // console.log(admin.name);
  //find name
  const studentName = await studentModel.findOne({ name });
  //find email
  const studentEmail = await studentModel.findOne({ email });
  if (!studentName) {
    //if name not exist
    if (!studentEmail) {
      //if email not existt
      bcrypt.hash(password, 4, async (err, hash) => {
        if (err) {
          return response.json({ status: "Error", message: err });
        } else {
          //Add Student
          const student = await studentModel.insertMany({
            name,
            email,
            level,
            password: hash,
            teachedBy,
            addedBy: admin.name,
          });
          return response.json({
            status: "Success",
            message: `Student ('${name}') be added succefully`,
            student,
          });
        }
      });
    } else {
      //if email exist
      return response.json({
        status: "Error",
        message: "Email is Alreay Exist",
      });
    }
  } else {
    //if name exist
    return response.json({ status: "Error", message: "Name is alreay exist" });
  }
};
module.exports = addStudent;
