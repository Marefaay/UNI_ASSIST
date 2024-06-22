const path = require("path");
const xlsx = require("xlsx");
const bcrypt = require("bcrypt");
const studentModel = require("../../models/student");
const profOrProfAssistModel = require("../../models/prof-profAssist");
const fs = require("fs");
const uploadAcadmicStaffFile = async (request, response) => {
  // No File in request
  if (!request.file) {
    return response.json({ status: "Error", message: "No File To Upload" });
  }

  // Get file path
  const filePath = path.join(
    __dirname,
    `../../LectureFiles/${request.file.filename}`
  );

  // Load the Excel file
  const workbook = xlsx.readFile(filePath);

  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const data = xlsx.utils.sheet_to_json(worksheet);
  console.log(data);

  // To collect errors
  let errors = [];

  // Using for loop instead of forEach to handle async/await properly
  for (let ASMember of data) {
    try {
      const AcadmicStaffMemberFounded = await profOrProfAssistModel.findOne({
        email: ASMember.email,
      });

      if (AcadmicStaffMemberFounded) {
        errors.push(
          `Acadamic Staff Member With Email ${ASMember.email} is Already Exist`
        );
      } else {
        // Check if password is a string of digits only
        if (ASMember.password && /^\d+$/.test(ASMember.password)) {
          // Convert password to string just to be sure
          const plainPassword = ASMember.password.toString();

          const salt = await bcrypt.genSalt(4);
          const hashedPassword = await bcrypt.hash(plainPassword, salt);
          const subjects = ASMember.subject
            ? ASMember.subject.split(",").map((sub) => sub.trim())
            : [];
          // Create the ASMember record
          await profOrProfAssistModel.create({
            name: ASMember.name,
            email: ASMember.email,
            password: hashedPassword,
            subject: subjects,
            role: ASMember.role,
          });
        } else {
          errors.push(
            `Invalid password for Acadmic Staff member with email ${ASMember.email}. Password must be numeric.`
          );
        }
      }
    } catch (err) {
      errors.push(
        `Error processing for Acadmic Staff member with email ${ASMember.email}: ${err.message}`
      );
    }
  }

  // Respond once with all errors (if any)
  if (errors.length > 0) {
    return response.json({ status: "Error", message: errors });
  }
  fs.unlinkSync(filePath);

  // Successful response
  response.json({
    status: "Success",
    message: "File Uploaded Successfully",
  });
};

module.exports = uploadAcadmicStaffFile;
