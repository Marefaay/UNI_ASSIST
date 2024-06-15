const sectionModel = require("../../models/section");
const subjectModel = require("../../models/subject");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

const deleteSection = async (request, response) => {
  const { id } = request.params;
  //find section
  const section = await sectionModel.findOne({ _id: id });
  //section not found
  // console.log(lecture);
  if (!section) {
    return response.json({
      status: "Error",
      message: "This Section Is Not Exist",
    });
  }
  //section is found
  //delete section from cloudniry
  //   console.log(lecture.fileUrl.publicId);
    const remove = await removeFromCloudinary(section.fileUrl.publicId);
  console.log(remove);
  //delete section from lecture collection
  const sectionDeleted = await sectionModel.deleteOne({ _id: id });

  //delete section from subject
  //find section
  const subject = await subjectModel.findOne({ _id: section.subject });
  // console.log(subject);
  //check if subject contain this section
  const cont = subject.sections.includes(id);
  if (cont) {
    //find index of section
    let indexOfSection = subject.sections.indexOf(id);
    // if found
    if (indexOfSection > -1) {
      //remove section
      subject.sections.splice(indexOfSection, 1);
      await subject.save();
    }
    // console.log(indexOfSection);
  }
  // console.log(cont);
  return response.json({
    status: "Success",
    message: `section Number ${section.number} IS Deleted Succelly`,
  });
};
module.exports = deleteSection;
