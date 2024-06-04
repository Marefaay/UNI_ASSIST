//OK
const mongoose = require("mongoose");
//Business logic
const objectIdValidation = async (request, response, next) => {
  //take student id
  const { id } = request.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    //if object id is correct
    next();
  } else {
    //if object id is not correct
    return response.json({ status: "Error", message: "Id is not Valid" });
  }
};
module.exports = objectIdValidation;
