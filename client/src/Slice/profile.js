import { createSlice } from "@reduxjs/toolkit";
import { getToLocalStorage } from "../utils/localStorage";

const initialState = {
  user: null,
  isLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.user = payload;
    },
    setProfileImg: (state, { payload }) => {
      state.user.img = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setProfile, setLoading,setProfileImg } = profileSlice.actions;
export default profileSlice.reducer;
