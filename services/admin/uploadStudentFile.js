const path = require("path");
const xlsx = require("xlsx");
const bcrypt = require("bcrypt");
const studentModel = require("../../models/student");

const uploadStudentFile = async (request, response) => {
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
  for (let std of data) {
    try {
      const studentFounded = await studentModel.findOne({ email: std.email });

      if (studentFounded) {
        errors.push(`Student With Email ${std.email} is Already Exist`);
      } else {
        // Check if password is a string of digits only
        if (std.password && /^\d+$/.test(std.password)) {
          // Convert password to string just to be sure
          const plainPassword = std.password.toString();

          const salt = await bcrypt.genSalt(4);
          const hashedPassword = await bcrypt.hash(plainPassword, salt);

          // Create the student record
          await studentModel.create({
            name: std.name,
            email: std.email,
            password: hashedPassword,
            level: std.level,
            role: std.role,
          });
        } else {
          errors.push(
            `Invalid password for student with email ${std.email}. Password must be numeric.`
          );
        }
      }
    } catch (err) {
      errors.push(
        `Error processing student with email ${std.email}: ${err.message}`
      );
    }
  }

  // Respond once with all errors (if any)
  if (errors.length > 0) {
    return response.json({ status: "Error", message: errors });
  }

  // Successful response
  response.json({
    status: "Success",
    message: "File Uploaded Successfully",
  });
};

module.exports = uploadStudentFile;
