import { Router } from "express";

import { auth, isStudent, isInstructor, isAdmin } from "../middleware/auth.js";

import {
  createReviewAndLike,
  getAllRating,
  getAverageRating,
  createSection,
  updateSection,
  deleteSection,
  createSubsection,
  updateSubsection,
  deleteSubsection,
  createCourse,
  getCourseDetailAuth,
  getAllCourseDetails,
  createCategory,
  showAllCategory,
  categoryPageDetails,
  deleteCourse,
  updateCourse,
  getInstructorCourse,
  getCourseDetail,
  getStudentCourseDetails,
  updateCourseProgress,
} from "../controllers/index.js";

// route
const courseRoute = new Router();

// -------------Category------------//

// create categories by admin only
courseRoute.post("/createCategory", auth, isAdmin, createCategory);
// get category
courseRoute.get("/showAllCategory", showAllCategory);
// get category details
courseRoute.post("/categoryPageDetails", categoryPageDetails);

// -----------course-------------//
// ->can be created by Instructor only
courseRoute.post("/createCourse", auth, isInstructor, createCourse);
courseRoute.delete("/deleteCourse", auth, deleteCourse);
courseRoute.post("/editCourse", auth, updateCourse);
courseRoute.get("/getAllCourseDetails", getAllCourseDetails);
courseRoute.post("/getCourseDetail", auth, isInstructor, getCourseDetailAuth);
courseRoute.get("/getCourseDetail", getCourseDetail);
courseRoute.get(
  "/getInstructorCourse",
  auth,
  isInstructor,
  getInstructorCourse
);

// -------------Section--------------//
courseRoute.post("/createSection", auth, isInstructor, createSection);
courseRoute.post("/updateSection", auth, isInstructor, updateSection);
courseRoute.delete("/deleteSection", auth, isInstructor, deleteSection);

// -----------SubSection------------//
courseRoute.post("/createSubsection", auth, isInstructor, createSubsection);
courseRoute.post("/updateSubsection", auth, isInstructor, updateSubsection);
courseRoute.delete("/deleteSubsection", auth, isInstructor, deleteSubsection);

// ----------RatingAndReview-----------//
courseRoute.post("/createReviewAndLike", auth, isStudent, createReviewAndLike);
courseRoute.get("/getAllRating", getAllRating);
courseRoute.post("/getAverageRating", getAverageRating);

// student
courseRoute.post(
  "/getStudentCourseDetails",
  auth,
  isStudent,
  getStudentCourseDetails
);

courseRoute.post(
  "/updateCourseProgress",
  auth,
  isStudent,
  updateCourseProgress
);

export default courseRoute;
