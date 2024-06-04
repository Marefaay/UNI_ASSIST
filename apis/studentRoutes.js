const userAutherization = require("../middlwares/autherization/studentAutherization");
const QRCodeUpload = require("../middlwares/upload/QRCodeUpload");
const profilePhotoUpload = require("../middlwares/upload/profilePhotoUpload");
const stuedntValidation = require("../middlwares/validation/studentValidation");
const viewAttendanceValidation = require("../middlwares/validation/viewAttendanceValidation");
// const att = require("../services/student/att");
const studentLogin = require("../services/student/login");
const profilePhoto = require("../services/student/profilePhoto");
const scanQRCodeLecture = require("../services/student/scanQRCodeForLecture");
const scanQRCodeSection = require("../services/student/scanQrCodeForSection");
const scan = require("../services/student/scan");
const scanQR = require("../services/student/scanQRCodeForLecture");
const viewAttendance = require("../services/student/viewAttendanceForStudent");
const viewsubjectAttendance = require("../services/student/viewAttendanceForStudent");
const logout = require("../services/student/logout");
const router = require("express").Router();
//Login
router.post("/login", stuedntValidation, studentLogin);
//Record Attendance for lecture
router.put(
  "/scan-qr-lecture",
  userAutherization,
  QRCodeUpload.single("image"),
  scanQRCodeLecture
);
//Record Attendance for section
router.put(
  "/scan-qr-section",
  userAutherization,
  QRCodeUpload.single("image"),
  scanQRCodeSection
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
  "/view-attendance",
  userAutherization,
  viewAttendanceValidation,
  viewsubjectAttendance
);
//Logout
router.post("/logout", userAutherization, logout);
module.exports = router;
