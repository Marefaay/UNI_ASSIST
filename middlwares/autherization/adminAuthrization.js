//OK
const jwt = require("jsonwebtoken");
const adminModel = require("../../models/admin");

//Bussiness logic
const adminAutherization = async (request, response, next) => {
  token = request.header("token");
  // verify a token
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    //find admin
    
    if (err) {
      return response.json({ status: "Error", message: err });
    } else {
      //check if admins
      const admin = await adminModel.findOne({ _id: decoded.id });
      if (admin) {
        //admin exist
        if (decoded.isAdmin) {
          //if is admin
          request.id = decoded.id;
          next();
        } else {
          //if not admin
          return response.json({
            status: "Error",
            message: "You are anot allowed to acces this only admins",
          });
        }
      } else {
        //not exits
        return response.json({
          status: "Error",
          message: "This Admin Not Found",
        });
      }
    }
  });
};
module.exports = adminAutherization;
