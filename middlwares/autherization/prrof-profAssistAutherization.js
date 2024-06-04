//OK
const jwt = require("jsonwebtoken");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const profOrProfAssistAutherization = async (request, response, next) => {
  const token = request.header("token");
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return response.json({ status: "Error", message: err });
    } else {
      //if prof not exist
      // const profOrProfAssist = await profOrProfAssistModel.findOne({
      //   _id: request.id,
      // });
      // if (!profOrProfAssist) {
      //   return response.json({
      //     status: "Error",
      //     message: "This ProfOrProf Assist Not Found",
      //   });
      // }
      //check role
      if (!decoded.isAdmin && decoded.role == "prof-profAssist") {
        request.id = decoded.id;
        next();
      } else {
        response.json({
          status: "Error",
          message: "You Are Not Allowed To Enter here",
        });
      }
    }
  });
};
module.exports = profOrProfAssistAutherization;
