const lectureStorage = require("./lectureStorage");
const multer = require("multer");
const lectureUpload = multer({
  storage: lectureStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("application/pdf")) {///,mm
      cb(null, true);
    
    } else {
      cb({ message: "UnSupported file Type to upload" }, false);
    }
  },

 
});
module.exports = lectureUpload;
