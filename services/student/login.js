const studentModel = require("../../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentLogin = async (request, response) => {
  const { email, password } = request.body;
  //find student email
  const studentEmail = await studentModel.findOne({ email });
  //check on email
  if (studentEmail) {
    //compare password
    const match = await bcrypt.compare(password, studentEmail.password);
    if (match) {
      //create token
      const token = jwt.sign(
        {
          id: studentEmail._id,
          isAdmin: studentEmail.isAdmin,
          role: studentEmail.role,
        },
        process.env.SECRET_KEY
      );
      //send response
      return response.json({
        status: "Success",
        message: `Congratulations ('${studentEmail.name}') you are loggined succefully`,
        token,
        studentEmail,
      });
    } else {
      return response.json({ status: "Error", message: "Password Incorrect" });
    }
  } else {
    return response.json({
      status: "Error",
      message: `No Student With Email('${email}') `,
    });
  }
};
module.exports = studentLogin;
