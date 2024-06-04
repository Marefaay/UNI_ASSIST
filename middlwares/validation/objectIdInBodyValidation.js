const mongoose = require("mongoose");

const objectIdInBodyValidation = async (request, response, next) => {
  const { subjects } = request.body;

  for (let i = 0; i < subjects.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(subjects[i])) {
      return response.json({
        status: "Error",
        message: `'${subjects[i]}' This Object Id Is Not Valid`,
      });
    }
  }

  // If all subject IDs are valid, call next()
  next();
};

module.exports = objectIdInBodyValidation;
