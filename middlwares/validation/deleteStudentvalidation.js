const joi = require("joi");
//joi schema
const schema = joi.object({
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 1, tlds: { allow: ["eg"] } })
    .pattern(/^([a-zA-Z]{3,})?(\d{4})(@fci.bu.edu.eg)/),
});
//Bussiness Logic
const deleteStudentValidation = async (request, response, next) => {
  const errorsArray = [];
  const { error } = schema.validate(request.body);
  if (!error) {
    next();
  } else {
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    return response.json({ status: "Error", message: errorsArray });
  }
};
module.exports = deleteStudentValidation;
