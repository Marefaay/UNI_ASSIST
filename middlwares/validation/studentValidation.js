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
    .pattern(/^([a-zA-Z]{3,})?(\d{5,6})(@fci.bu.edu.eg)/),
  level: joi.string().required(),
  password: joi
    .string()
    .required()
    .pattern(/[0-9]{14}/)
    .min(14)
    .max(14),

  //8char 1u 1l 1num 1speical
  repeat_password: joi.ref("password"),
});
//Bussiness Logic
const studentValidation = async (request, response, next) => {
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
module.exports = studentValidation;
