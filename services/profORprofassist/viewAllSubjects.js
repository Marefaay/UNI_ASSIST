const profOrProfAssistModel = require("../../models/prof-profAssist");
const subjectModel = require("../../models/subject");

const ViewAllSubjects = async (request, response) => {
  try {
    const prof = await profOrProfAssistModel.findOne({ _id: request.id });

    // Check if the prof is found
    if (!prof) {
      return response.json({
        status: "Error",
        message: "This ProfOrProfAssist Is Not Found",
      });
    }

    // Fetch the subjects associated with the prof
    const subjects = await Promise.all(
      prof.subject.map(async (sub) => {
        const subj = await subjectModel.findOne({ title: sub });
        if (!subj) {
          return {
            _id: null,
            title: sub,
            message: "Subject Not Found",
          };
        }
        return {
          _id: subj._id,
          title: subj.title,
        };
      })
    );

    return response.json({
      status: "Success",
      message: "Subjects Retrieved Successfully",
      subjects,
      subjectsCount: subjects.length,
    });
  } catch (error) {
    console.error(error);
    return response.json({
      status: "Error",
      message: "Error retrieving subjects",
    });
  }
};

module.exports = ViewAllSubjects;
