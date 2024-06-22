//OK
const joi = require("joi");

//Joi Schema
const schema = joi.object({
  name: joi
    .string()
    .min(5)
    .max(30)
    .pattern(/[a-zA-Z]{5,15}_Admin/),
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 1, tlds: { allow: ["eg"] } })
    .pattern(/^([a-zA-Z]{3,})(?!\d)(@fci.bu.edu.eg)/),
  password: joi
    .string()
    .required()
    .min(8)
    .max(80)
    .pattern(/^[0-9]*$/),
  repeatPassword: joi.ref("password"),
});
//bussiness logic
const adminValidation = async (request, response, next) => {
  const errorsArray = [];
  //validate on data in body of request
  const { error } = schema.validate(request.body);
  if (!error) {
    //if there is no error
    next();
  } else {
    // if there is an errors
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    //response
    return response.json({ status: "Error", message: errorsArray });
  }
};
module.exports = adminValidation;
