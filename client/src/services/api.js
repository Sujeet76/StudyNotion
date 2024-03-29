// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: "/auth/sendotp",
  SIGNUP_API: "/auth/signup",
  LOGIN_API: "/auth/login",
  RESETPASSTOKEN_API: "/auth/reset-password-token",
  RESETPASSWORD_API: "/auth/reset-password",
};

// // PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: "/profile/instructorDashboard",
};

// // STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: "/payment/capturePayment",
  COURSE_VERIFY_API: "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: "/payment/sendPaymentSuccessEmail",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: "/course/getAllCourses",
  COURSE_DETAILS_API: "/course/getCourseDetail",
  EDIT_COURSE_API: "/course/editCourse",
  COURSE_CATEGORIES_API: "/course/showAllCategories",
  CREATE_COURSE_API: "/course/createCourse",
  CREATE_SECTION_API: "/course/createSection",
  CREATE_SUBSECTION_API: "/course/createSubsection",
  UPDATE_SECTION_API: "/course/updateSection",
  UPDATE_SUBSECTION_API: "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: "/course/getInstructorCourse",
  DELETE_SECTION_API: "/course/deleteSection",
  DELETE_SUBSECTION_API: "/course/deleteSubSection",
  DELETE_COURSE_API: "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: "/course/getCourseDetail",
  LECTURE_COMPLETION_API: "/course/updateCourseProgress",
  CREATE_RATING_API: "/course/createReviewAndLike",
  GET_STUDENT_COURSE_DETAILS: "/course/getStudentCourseDetails",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_ALL_DETAILS_API: "/course/getAllRating",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: "/course/showAllCategory",
};

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: "/course/categoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: "/reach/contact",
};

// // SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: "/profile/updateProfile",
  CHANGE_PASSWORD_API: "/auth/change-password",
  DELETE_PROFILE_API: "/profile/deleteAccount",
};
