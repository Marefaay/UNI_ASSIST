//OK
const joi = require("joi");

//schema
const schema = joi.object({
  subjectName: joi.string().required().min(3).max(25),
  week: joi.string().required(),
  department: joi.string().required(),
  location: joi.string().required(),
  lecturereName: joi.string().required(),
});
//bussines logic
const scanQRCodeValidation = async (request, response, next) => {
  //Validate on data on request body
  const { error } = schema.validate(request.body);
  const errorsArray = [];
  if (!error) {
    //if there is no error
    next();
  } else {
    //if there is an error
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    return response.json({ status: "Error", message: errorsArray });
  }
};
module.exports = scanQRCodeValidation;
