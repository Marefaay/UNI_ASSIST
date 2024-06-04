const postImageStorage = require("./postImageStorage");
const multer = require("multer");
const postImageUpload = multer({
  storage: postImageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "UnSupported file Type tp uload" }, false);
    }
  },

  limits: { fieldSize: 1024 * 1024 }, //1mega
});
module.exports = postImageUpload;
