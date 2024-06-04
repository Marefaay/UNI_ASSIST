const profOrProfAssistAutherization = require("../middlwares/autherization/prrof-profAssistAutherization");
const lectureUpload = require("../middlwares/upload/lectureUpload");
const postImageUpload = require("../middlwares/upload/postImageUpload");
const profilePhotoUpload = require("../middlwares/upload/profilePhotoUpload");
const addpostValidation = require("../middlwares/validation/addPostValidation");
const objectIdValidation = require("../middlwares/validation/objectIdValdation");
const profOrProfAssistValidation = require("../middlwares/validation/prof-profAssistValidation");
const viewAttendanceValidation = require("../middlwares/validation/viewAttendanceValidation");
const uploadLecture = require("../services/Lectures/uploadLecture");
const addPost = require("../services/post/addPost");
const profOrProfAssistLogin = require("../services/profORprofassist/login");
const logout = require("../services/profORprofassist/logout");
const profilePhoto = require("../services/profORprofassist/profilePhoto");
const showQrCode = require("../services/profORprofassist/showQrCode");
// const profOrProfAssistRegistration = require("../services/admin/addProfOrProfAssist");
const viewLectureAttendanceForProf = require("../services/profORprofassist/viewLectureAttendanceForProf");
const viewSectionAttendanceForProfOrProfAssist = require("../services/profORprofassist/viewSectionAttendanceForprofOrProfAssist");

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
  lectureUpload.single("lecture"),
  uploadLecture
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
