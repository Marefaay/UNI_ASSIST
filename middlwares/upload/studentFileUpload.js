const multer = require("multer");
const studentFileStorage = require("./studentFileStorage");

const studentFileUpload = multer({
  storage: studentFileStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
});

module.exports = studentFileUpload;
