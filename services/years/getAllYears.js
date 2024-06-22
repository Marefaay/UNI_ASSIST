const adminModel = require("../../models/admin");
const yearModel = require("../../models/years");

const getAllYears = async (request, response) => {
  try {
    //find admin
    const admin = await adminModel.findOne({ _id: request.id });
    //admin not exist
    if (!admin) {
      return response.json({ status: "Error", message: "Admin Is Not Found" });
    }
    //find years
    const years = await yearModel.find({}).populate("semesters");
    console.log(years);
    //no years
    if (years.length == 0) {
      return response.json({ status: "Error", message: "No Years To Show It" });
    }
    //reponse
    response.json({
      status: "Success",
      message: "Years retrieved successfully",
      years,
    });
  } catch (err) {
    response.json({ status: "Error", message: err.message });
  }
};
module.exports = getAllYears;
