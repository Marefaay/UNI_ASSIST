const profOrProfAssistAutherization = require("../middlwares/autherization/prrof-profAssistAutherization");
const lectureUpload = require("../middlwares/upload/subjectFilesUpload");
const postImageUpload = require("../middlwares/upload/postImageUpload");
const profilePhotoUpload = require("../middlwares/upload/profilePhotoUpload");
const addpostValidation = require("../middlwares/validation/addPostValidation");
const objectIdValidation = require("../middlwares/validation/objectIdValdation");
const profOrProfAssistValidation = require("../middlwares/validation/prof-profAssistValidation");
const viewAttendanceValidation = require("../middlwares/validation/viewAttendanceValidation");
const deleteLecture = require("../services/Lectures/deleteLecture");
const getLecture = require("../services/Lectures/getLecture");
const upload = require("../services/Lectures/upload");
const addPost = require("../services/post/addPost");
const profOrProfAssistLogin = require("../services/profORprofassist/login");
const logout = require("../services/profORprofassist/logout");
const profilePhoto = require("../services/profORprofassist/profilePhoto");
const showQrCode = require("../services/profORprofassist/showQrCode");
// const profOrProfAssistRegistration = require("../services/admin/addProfOrProfAssist");
const viewLectureAttendanceForProf = require("../services/profORprofassist/viewLectureAttendanceForProf");
const viewSectionAttendanceForProfOrProfAssist = require("../services/profORprofassist/viewSectionAttendanceForprofOrProfAssist");
const uploadSection = require("../services/sections/uploadSection");
const filesUpload = require("../middlwares/upload/subjectFilesUpload");
const deleteSection = require("../services/sections/deleteSection");
const updateLectureNumber = require("../services/Lectures/updateLecturenumber");
const updateSectionNumber = require("../services/sections/updateSectionNumber");
const updateLecturePDF = require("../services/Lectures/updateLecturePDF");
const updateSectionPdf = require("../services/sections/updatedSectionPdf");

const router = require("express").Router();

//login
router.post("/login", profOrProfAssistValidation, profOrProfAssistLogin); //OK
//view lecture Attendance
router.get(
  "/view-lecture-attendance",
  profOrProfAssistAutherization,
  viewAttendanceValidation,
  viewLectureAttendanceForProf
); //OK
router.get(
  "/view-section-attendance",
  profOrProfAssistAutherization,
  viewAttendanceValidation,
  viewSectionAttendanceForProfOrProfAssist
); //ok
router.post(
  "/profile/upload-profile-photo",
  profOrProfAssistAutherization,
  profilePhotoUpload.single("image"),
  profilePhoto
);
//Show Qr Code
router.get(
  "/show-QR",
  profOrProfAssistAutherization,
  profilePhotoUpload.single("image"),
  showQrCode
);
//add lecture
router.post(
  "/lecture/add-lecture/:id",
  profOrProfAssistAutherization,

  objectIdValidation,
  filesUpload.single("file"),
  upload
);
//update lecture Number
router.put(
  "/lecture/update-lecture-Number/:id",
  profOrProfAssistAutherization,
  objectIdValidation,
  updateLectureNumber
);
// update lecture Pdf
router.put(
  "/lecture/update-lecture-pdf/:id",
  profOrProfAssistAutherization,
  objectIdValidation,
  filesUpload.single("file"),
  updateLecturePDF
);
//delete lecture
router.delete(
  "/lecture/delete-lecture/:id",
  profOrProfAssistAutherization,
  objectIdValidation,
  deleteLecture
);
//add Section
router.post(
  "/section/add-section/:id",
  profOrProfAssistAutherization,
  objectIdValidation,
  filesUpload.single("file"),
  uploadSection
);
//update Section Number
router.put(
  "/section/update-section-number/:id",
  profOrProfAssistAutherization,
  objectIdValidation,
  updateSectionNumber
);
//update Lecture Pdf
router.put(
  "/section/update-section-pdf/:id",
  profOrProfAssistAutherization,
  objectIdValidation,
  filesUpload.single("file"),
  updateSectionPdf
);
//delete section
router.delete(
  "/section/delete-section/:id",
  profOrProfAssistAutherization,
  objectIdValidation,
  deleteSection
);
// router.post(
//   "/lecture/add-lecture/:id",
//   profOrProfAssistAutherization,
//   objectIdValidation,
//   uploadLecture
// );
//addPost
router.post(
  "/post/add-post",
  profOrProfAssistAutherization,
  addpostValidation,
  postImageUpload.single("image"),
  addPost
);
//Logout
router.post("/logout", profOrProfAssistAutherization, logout); //ok
module.exports = router;
