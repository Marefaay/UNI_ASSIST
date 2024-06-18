//ok
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
const deleteGraduationStuedntValidation = async (request, response, next) => {
  const errorsArray = [];
  ///Validate on data in erquest body
  const { error } = schema.validate(request.body);
  if (!error) {
    //if no error
    next();
  } else {
    //if there is an error
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    return response.json({ status: "Error", message: errorsArray });
  }
};
module.exports = deleteGraduationStuedntValidation;
