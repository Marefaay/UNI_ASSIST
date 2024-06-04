const yearModel = require("../../models/years");

const oneYear = async (request, response) => {
  try {
    const { id } = request.params;
    //find year
    const year = await yearModel.find({ _id: id }).populate("semesters");
    console.log(year);
    ///year not found
    if (year.length == 0) {
      return response.json({ status: "Error", message: "Year not found" });
    }
    // response
    response.json({
      status: "Success",
      message: "Year retrieved successfully",
      year,
    });
  } catch (err) {
    response.json({ status: "Error", message: err.message });
  }
};
module.exports = oneYear;
