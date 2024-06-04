const joi = require("joi");
//schema
const schema = joi.object({
  semesterNo: joi.number().required().min(1).max(3),
  yearNo: joi.number().required().min(1).max(4),
  subjects: joi.array().required().min(5).max(6),
});
//model
const semsterValidation = async (request, response, next) => {
  const errorsArray = [];
  const { error } = schema.validate(request.body);
  if (!error) {
    //if no errors
    next();
  } else {
    //if there is errors
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    return response.json({ status: "Error", message: errorsArray });
  }
};
module.exports = semsterValidation;
