const userAutherization = require("../middlwares/autherization/studentAutherization");
const QRCodeUpload = require("../middlwares/upload/QRCodeUpload");
const profilePhotoUpload = require("../middlwares/upload/profilePhotoUpload");
const stuedntValidation = require("../middlwares/validation/studentValidation");
const viewAttendanceValidation = require("../middlwares/validation/viewAttendanceValidation");
// const att = require("../services/student/att");
const studentLogin = require("../services/student/login");
const profilePhoto = require("../services/student/profilePhoto");
// const scanQRCodeLecture = require("../services/student/scanQRCodeForLecture");
// const scanQRCodeSection = require("../services/student/scanQrCodeForSection");
// const scan = require("../services/student/scan");
// const scanQR = require("../services/student/scanQRCodeForLecture");
const viewAttendance = require("../services/student/viewAttendanceForStudent");
const viewsubjectAttendance = require("../services/student/viewAttendanceForStudent");
const logout = require("../services/student/logout");
const downloadLecture = require("../services/Lectures/downloadLecture");
const objectIdValidation = require("../middlwares/validation/objectIdValdation");
const getLecture = require("../services/Lectures/getLecture");
const getSection = require("../services/sections/getSection");
const downloadSection = require("../services/sections/downloadSection");
// const scanQR = require("../services/student/scanQRCodeForLecture");
// const s = require("../services/student/scanQRCodeForSection");
// const scanQRCodeForSection = require("../services/student/scanQRCodeForSection");
const scanQRCodeForLecture = require("../services/student/scanQRCodeForLecture");
const scanQRCodeForSection = require("../services/student/scanQRCodeForSection");
const scanQRCodeValidation = require("../middlwares/validation/scanQRCodeValidation");
const toggleLikes = require("../services/post/toggleLikes");
const addComment = require("../services/comment/addComment");
const addCommentValidation = require("../middlwares/validation/addCommentValidation");
const studentComments = require("../services/comment/studentComments");
const deleteComment = require("../services/comment/deleteComents");
const upadteComment = require("../services/comment/updateComment");
const viewLectureAndSectionAttendanceForStudent = require("../services/student/ViewLectureAndSectionAttendanceForStudent");
const viewAllPosts = require("../services/student/viewAllPosts");
const router = require("express").Router();
//Login
router.post("/login", stuedntValidation, studentLogin);
//Record Attendance for lecture
router.put(
  "/scan-qr-lecture",
  userAutherization,
  scanQRCodeValidation,
  scanQRCodeForLecture
);
//Record Attendance for section
router.put(
  "/scan-qr-section",
  userAutherization,
  scanQRCodeValidation,
  scanQRCodeForSection
);
//Upload Profile Photo
router.post(
  "/profile/upload-profile-photo",
  userAutherization,
  profilePhotoUpload.single("image"),
  profilePhoto
);
//View Subject Attendance
router.get(
  "/attendance/view-attendance",
  userAutherization,
  viewAttendanceValidation,
  viewLectureAndSectionAttendanceForStudent
);
//get lecture
router.get(
  "/lecture/get-lecture/:id",
  userAutherization,
  objectIdValidation,
  getLecture
);
//get Section
router.get(
  "/section/get-section/:id",
  userAutherization,
  objectIdValidation,
  getSection
);
//download lecture
router.get(
  "/lecture/download-lecture/:id",
  userAutherization,
  objectIdValidation,
  downloadLecture
);
//download Section
router.get(
  "/section/download-section/:id",
  userAutherization,
  objectIdValidation,
  downloadSection
);
//View All Posts
router.get("/posts/all-posts", userAutherization, viewAllPosts);
//toggle post
router.put(
  "/post/likes/toggle/:id",
  userAutherization,
  objectIdValidation,
  toggleLikes
);
// add comment
router.post(
  "/post/comments/add-comment/:id",
  userAutherization,
  objectIdValidation,
  addCommentValidation,
  addComment
);
//students Comments
router.get("/commets/get-all", userAutherization, studentComments);
//delete  comment
router.delete(
  "/comments/delete-one/:id",
  userAutherization,
  objectIdValidation,
  deleteComment
);
//update Comment
router.put(
  "/comments/update-comment/:id",
  userAutherization,
  objectIdValidation,
  addCommentValidation,
  upadteComment
);
//Logout
router.post("/logout", userAutherization, logout);
module.exports = router;
