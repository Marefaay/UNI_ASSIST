const multer = require("multer");
const path = require("path");

const studentFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../LectureFiles"));
  },
  filename: (req, file, cb) => {
    if (file) {
      const date = new Date().toISOString().replace(/:/g, "-");
      cb(null, date + file.originalname);
    } else {
      cb(null, false);
    }
  },
});

module.exports = studentFileStorage;
