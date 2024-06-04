const adminAutherization = require("../middlwares/autherization/adminAuthrization");
const adminValidation = require("../middlwares/validation/adminValidation");
const graduationStuedntValidation = require("../middlwares/validation/gradutionStudent");
const objectIdInBodyValidation = require("../middlwares/validation/objectIdInBodyValidation");
const objectIdValidation = require("../middlwares/validation/objectIdValdation");
const profOrProfAssistValidation = require("../middlwares/validation/prof-profAssistValidation");
const semsterValidation = require("../middlwares/validation/semsterValidation");
const stuedntValidation = require("../middlwares/validation/studentValidation");
const subjectValidation = require("../middlwares/validation/subjectValidation");
const viewAttendanceValidation = require("../middlwares/validation/viewAttendanceValidation");
const addGraduationStudent = require("../services/admin/addGraduationStudent");
const addProfOrProfAssist = require("../services/admin/addProfOrProfAssist");
const addStudent = require("../services/admin/addStudent");
const addSubject = require("../services/admin/addSubject");
const deleteGrduationStudent = require("../services/admin/deleteGraduationStudent");
const delteSubject = require("../services/admin/deleteSubject");
const deleteAdmin = require("../services/admin/delteAdmin");
const deleteStudent = require("../services/admin/delteStudent");
const adminLogin = require("../services/admin/login");
const adminLogout = require("../services/admin/logout");
const logout = require("../services/admin/logout");
const moveToGraduationLevel = require("../services/admin/moveToGraduationLevel");
const adminRegisteration = require("../services/admin/register");
const showAllGraduationStudent = require("../services/admin/showAllGraduationStudent");
const showAllStudent = require("../services/admin/showAllStudent");
const showAllSubjects = require("../services/admin/showAllSubjects");
const updateSubject = require("../services/admin/updateSubject");
const viewLectureAttendance = require("../services/admin/viewLectureAttendanceForAdmin");
const viewSectionAttendance = require("../services/admin/viewSectionAttendanceForAdmin");
const addSemster = require("../services/semster/addSemster");
const deleteSemster = require("../services/semster/deleteSemster");
const getAllSemsters = require("../services/semster/getAllSemsters");
const getOneSemster = require("../services/semster/getOneSemster");
const addYear = require("../services/years/addYear");
const deleteYear = require("../services/years/deleteYear");
const getAllYears = require("../services/years/getAllYears");
const oneYear = require("../services/years/oneYear");

const router = require("express").Router();
//Admin Registration
router.post("/Register", adminValidation, adminRegisteration); //OK
//Admin Login
router.post("/Login", adminValidation, adminLogin); //OK
//add profOrProf Assist
router.post(
  "/add-profOrProfAssist",
  adminAutherization,
  profOrProfAssistValidation,
  addProfOrProfAssist
);
//Add Student
router.post("/Add-Student", adminAutherization, stuedntValidation, addStudent); //OK
//delete student
router.delete(
  "/delte-student/:id",
  adminAutherization,
  objectIdValidation,
  deleteStudent
); //OK
//show all underGraduated student
router.get("/show-all-student", adminAutherization, showAllStudent); //OK
//moveToGraduationLevel
router.post(
  "/move-to-graduation-level",
  adminAutherization,
  moveToGraduationLevel
); //OK
//delte graduated student
router.delete(
  "/delte-graduation-student/:id",
  adminAutherization,
  objectIdValidation,
  deleteGrduationStudent
); //OK
//add graduation student
router.post(
  "/add-graduation-student",
  adminAutherization,
  graduationStuedntValidation,
  addGraduationStudent
); //OK
//show all graduated student
router.get(
  "/show-all-graduation-student",
  adminAutherization,
  showAllGraduationStudent
); //OK

//add Subject
router.post("/add-subject", adminAutherization, subjectValidation, addSubject); //OK
//delte subject
router.delete(
  "/delete-subject/:id",
  adminAutherization,
  objectIdValidation,
  delteSubject
); //TODO
//update Subject
router.put(
  "/update-subject/:id",
  adminAutherization,
  objectIdValidation,
  subjectValidation,
  updateSubject
);
//Show All Sujects
router.get("/show-all-subjects", adminAutherization, showAllSubjects); //ok
//delte admin
router.delete(
  "/delete-admin/:id",
  adminAutherization,
  objectIdValidation,
  deleteAdmin
); //TODO
//view Lecture  attendance
router.get(
  "/view-lecture-attendance",
  adminAutherization,
  viewAttendanceValidation,
  viewLectureAttendance
); //OK
//view Section  attendance

router.get(
  "/view-section-attendance",
  adminAutherization,
  viewAttendanceValidation,
  viewSectionAttendance
); //OK
//add year
router.post("/year/add-year", adminAutherization, addYear);
//delete year
router.delete(
  "/year/delete-year/:id",
  adminAutherization,
  objectIdValidation,
  deleteYear
);
//get all years
router.get("/year/all-years", adminAutherization, getAllYears);
//get one year
router.get("/year/one-year/:id", adminAutherization, oneYear);
//add semster
router.post(
  "/semster/add-semster",
  adminAutherization,
  semsterValidation,
  objectIdInBodyValidation,
  addSemster
);
//delete semster
router.delete(
  "/semster/delete-semester/:id",
  adminAutherization,
  objectIdValidation,
  deleteSemster
);
//get one semster
router.get(
  "/semster/one-semster/:id",
  adminAutherization,
  objectIdValidation,
  getOneSemster
);
//get all semsters
router.get("/semster/all-semsters", adminAutherization, getAllSemsters);
//logout
router.post("/logout", adminAutherization, logout); //ok
module.exports = router;
