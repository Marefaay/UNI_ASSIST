//OK
const joi = require("joi");

//schema
const schema = joi.object({
  ID: joi
    .string()
    .required()
    .min(4)
    .max(5)
    .pattern(/([a-zA-Z]{2})(\d{3,4})/),
});
//bussines logic
const deleteSubjectValidation = async (request, response, next) => {
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
module.exports = deleteSubjectValidation;
