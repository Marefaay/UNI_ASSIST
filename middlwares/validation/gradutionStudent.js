//ok
const joi = require("joi");
//joi schema
const schema = joi.object({
  name: joi
    .string()
    .min(15)
    .pattern(/[a-zA-Z](?!\d)/),

  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 1, tlds: { allow: ["eg"] } })
    .pattern(/^([a-zA-Z]{3,})?(\d{4})(@fci.bu.edu.eg)/),
  password: joi
    .string()
    .required()
    .min(14)
    .max(14)
    .pattern(/^[0-9]*$/),

  //8char 1u 1l 1num 1speical
  repeat_password: joi.ref("password"),
});
//Bussiness Logic
const graduationStuedntValidation = async (request, response, next) => {
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
module.exports = graduationStuedntValidation;
