const yearModel = require("../../models/years");

const deleteYear = async (request, response) => {
  try {
    const { id } = request.params;
    const year = await yearModel.findOne({ _id: id });
    console.log(year);
    //no year with same id
    if (!year) {
      return response.json({ status: "Error", message: "Year Not Found" });
    }
    //delete semster
    //delte year
    await yearModel.deleteOne({ _id: id });
   
    response.json({
      status: "success",
      message: `Year ${year.yearNo} deleted successfully`,
    });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
module.exports = deleteYear;
