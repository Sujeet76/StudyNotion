import {
  login,
  signup,
  generateOtp,
  changePassword,
} from "./auth/Auth.controller.js";
import {
  getUserDetails,
  deleteAccount,
  updateDisplayPicture,
  getEnrolledCourse,
  updateProfile,
  instructorDashboard,
} from "./user/Profile.controller.js";

import {
  getAllRating,
  createReviewAndLike,
  getAverageRating,
} from "./user/ReviewAndRating.controller.js";

import {
  createCourse,
  deleteCourse,
  getAllCourseDetails,
  getCourseDetail,
  updateCourse,
  getInstructorCourse,
} from "./course/Course.controller.js";

import {
  createSection,
  updateSection,
  deleteSection,
} from "./course/Section.controller.js";

import {
  createSubsection,
  updateSubsection,
  deleteSubsection,
} from "./course/Subsection.controller.js";

import {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} from "./course/Category.controller.js";

import {
  resetPasswordToken,
  resetPassword,
} from "./user/ResetPassword.controller.js";

export {
  login,
  signup,
  generateOtp,
  changePassword,
  getUserDetails,
  deleteAccount,
  updateDisplayPicture,
  getEnrolledCourse,
  updateProfile,
  getAllRating,
  deleteCourse,
  updateCourse,
  createReviewAndLike,
  getAverageRating,
  createCourse,
  getAllCourseDetails,
  getCourseDetail,
  createSection,
  updateSection,
  deleteSection,
  createSubsection,
  updateSubsection,
  deleteSubsection,
  createCategory,
  showAllCategory,
  categoryPageDetails,
  resetPasswordToken,
  resetPassword,
  instructorDashboard,
  getInstructorCourse,
};
