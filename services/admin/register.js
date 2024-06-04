//OK

const bcrypt = require("bcrypt");
const adminModel = require("../../models/admin");
//Bussiness Logic
const adminRegisteration = async (request, response) => {
  const { name, email, password } = request.body;
  //find admin
  const adminEmail = await adminModel.findOne({ email });
  const adminName = await adminModel.findOne({ name });
  //check on email
  if (adminName) {
    return response.json({
      status: "Error",
      message: `Admin Name('${name}') Is Already Exist`,
    });
  } else {
    //Check on name
    if (adminEmail) {
      return response.json({
        status: "Error",
        message: `This Email('${email}') Is Already Exist`,
      });
    } else {
      //hashing password
      bcrypt.hash(password, 4, async (err, hash) => {
        if (err) {
          return response.json({
            status: "Error",
            message: "No data To add",
          });
        } else {
          // add to db
          const admin = await adminModel.insertMany({
            name,
            email,
            password: hash,
          });
          return response.json({
            status: "Success",
            message: `Congratulations ('${name}') you registered succefully`,
            admin,
          });
        }
      });
    }
  }
};
module.exports = adminRegisteration;
