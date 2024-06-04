//OK
const joi = require("joi");

//Joi Schema
const schema = joi.object({
  title: joi.string().required().min(5).max(100),
  description: joi.string().required().min(50).min(200),

});
//bussiness logic
const addpostValidation = async (request, response, next) => {
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
module.exports = addpostValidation;
