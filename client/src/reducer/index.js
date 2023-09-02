import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../Slice/auth";
import profileSlice from "../Slice/profile";
import courseSlice from "../Slice/course";

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  course: courseSlice,
});

export default rootReducer;
