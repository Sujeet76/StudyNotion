// import library
import { Router } from "express";
// import controller
import {
  updateProfile,
  getUserDetails,
  updateDisplayPicture,
  getEnrolledCourse,
  deleteAccount,
  instructorDashboard,
} from "../controllers/index.js";

// import middleware
import { auth, isInstructor } from "../middleware/auth.js";

const profileRoute = new Router();

// ---------profile update routes---------//
profileRoute.put("/updateProfile", auth, updateProfile);
profileRoute.get("/getUserDetails", auth, getUserDetails);
/**update user profile */
profileRoute.put("/updateDisplayPicture", auth, updateDisplayPicture);
profileRoute.get("/getEnrolledCourses", auth, getEnrolledCourse);
profileRoute.delete("/deleteAccount", auth, deleteAccount);
profileRoute.get(
  "/instructorDashboard",
  auth,
  isInstructor,
  instructorDashboard
);

export default profileRoute;
