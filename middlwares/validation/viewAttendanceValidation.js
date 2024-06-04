const joi = require("joi");

//joi schema

const schema = joi.object({
  title: joi
    .string()
    .min(3)
    .max(25)
    .required()
  
});
// view attendance validation
const viewAttendanceValidation = async (request, response, next) => {
  const { error } = schema.validate(request.body);
  const errorsArray = [];
  if (!error) {
    next();
  } else {
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    return response.json({ status: "Error", message: errorsArray });
  }
};
module.exports = viewAttendanceValidation;
