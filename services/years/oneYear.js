const adminModel = require("../../models/admin");
const yearModel = require("../../models/years");

const oneYear = async (request, response) => {
  try {
    const { id } = request.params;
    //find admin
    const admin = await adminModel.findOne({ _id: request.id });
    //admin is not exist
    if (!admin) {
      return response.json({ status: "Error", message: "Admin Is Not Exist" });
    }
    //find year
    const year = await yearModel.findOne({ _id: id }).populate("semesters");
    console.log(year);
    ///year not found
    if (!year) {
      return response.json({
        status: "Error",
        message: "This Year Is Not Exist",
      });
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
