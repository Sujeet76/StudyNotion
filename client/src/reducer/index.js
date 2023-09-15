import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../Slice/auth";
import profileSlice from "../Slice/profile";
import courseSlice from "../Slice/course";
import cartSlice from "../Slice/cart";
import viewCourseSlice from "../Slice/viewCourseVideo";

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  course: courseSlice,
  cart: cartSlice,
  viewCourse : viewCourseSlice
});

export default rootReducer;
