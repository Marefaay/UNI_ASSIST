//Logiin
const profOrProfAssistModel = require("../../models/prof-profAssist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profOrProfAssistLogin = async (request, response) => {
  const { email, password } = request.body;
  //find pro-profAssist
  const profOrProfAssist = await profOrProfAssistModel.findOne({ email });
  //Check on email
  if (profOrProfAssist) {
    //check on password
    const match = await bcrypt.compare(password, profOrProfAssist.password);
    if (match) {
      //create token
      const token = jwt.sign(
        {
          id: profOrProfAssist.id,
          isAdmin: profOrProfAssist.isAdmin,
          role: profOrProfAssist.role,
        },
        process.env.SECRET_KEY
      );
      return response.json({
        status: "Success",
        message: `Congratualtions ('${profOrProfAssist.name}') you are loggined succefully`,
        token,
        profOrProfAssist,
      });
    } else {
      //password incorrect
      return response.json({ status: "Error", message: "Password Incorrect" });
    }
  } else {
    //email not exist
    return response.json({
      status: "Error",
      message: `Email ('${email}') Is Not Exist`,
    });
  }
};
module.exports = profOrProfAssistLogin;
