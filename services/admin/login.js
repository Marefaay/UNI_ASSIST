//OK
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../../models/admin");

//Bussiness Logic
const adminLogin = async (request, response) => {
  const { email, password } = request.body;
  //find admin with this email
  const admin = await adminModel.findOne({ email });
  //Check on email
  if (admin) {
    //match password
    const match = await bcrypt.compare(password, admin.password);

    if (match) {
      //Create Token
      const token = jwt.sign(
        { id: admin._id, isAdmin: admin.isAdmin },
        process.env.SECRET_KEY
      );
      //login
      return response.json({
        status: "Success",
        message: `Welcome Back ('${admin.name}') You are Logging Succefully`,
        token,
        admin,
      });
    } else {
      //if password incorrectt
      return response.json({ status: "Error", message: "Password Incorrect" });
    }
  } else {
    //if email not exist
    return response.json({
      status: "Error",
      message: `Email ('${email}') Is Not Exist`,
    });
  }
};
module.exports = adminLogin;
