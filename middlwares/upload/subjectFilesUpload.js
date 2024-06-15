const multer = require("multer");
const filesStorage = require("./subjectFilesStorage");

const filesUpload = multer({
  storage: filesStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
});

module.exports = filesUpload;
