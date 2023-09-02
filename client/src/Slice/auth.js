import { createSlice } from "@reduxjs/toolkit";
import { getToLocalStorage } from "../utils/localStorage";

const initialState = {
  signupData: null,
  isLoading: false,
  token: getToLocalStorage("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setSignupData: (state, { payload }) => {
      state.signupData = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { setLoading, setSignupData, setToken } = authSlice.actions;
export default authSlice.reducer;
