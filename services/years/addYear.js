const yearModel = require("../../models/years");

const addYear = async (request, response) => {
  try {
    const { yearNo } = request.body;
    //find year
    const yearNumber = await yearModel.findOne({ yearNo });
    console.log(yearNumber);
    //year already exist
    if (yearNumber) {
      return response.json({
        status: "Error",
        message: "This year Already Exist",
      });
    }
    //year is not exist
    //add year
    const year = await yearModel.insertMany({ yearNo });
    //response
    response.json({
      status: "success",
      message: "Year added successfully",
      year,
    });
  } catch (err) {
    response.json({ status: "Error", message: err.message });
  }
};
module.exports = addYear;
