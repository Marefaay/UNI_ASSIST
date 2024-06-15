const sectionModel = require("../../models/section");

const updateSectionNumber = async (request, response) => {
  const { id } = request.params;
  const { number } = request.body;
  //find section
  const section = await sectionModel.findOne({ _id: id });
  //section Not Exist
  if (!section) {
    return response.json({
      status: "Error",
      message: "This section Is Not Exist",
    });
  }
  //sectin Exist
  //number is already exist
  const sectionFounded = await sectionModel.findOne({ number });
  if (sectionFounded) {
    return response.json({
      status: "Error",
      message: "There Is Already Section With this Number ",
    });
  }
  await sectionModel.updateOne({ _id: id }, { number });
  //response
  return response.json({
    status: "Success",
    message: `Number of Section Updated To ${number}`,
  });
};
module.exports = updateSectionNumber;
