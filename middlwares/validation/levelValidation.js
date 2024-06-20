const joi = require("joi");
//joi schema
const schema = joi.object({
  level: joi.string().required(),
});
//Bussiness Logic
const levelValidation = async (request, response, next) => {
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
module.exports = levelValidation;
