import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  categories: [],
  edit: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSteps: (state, { payload }) => {
      state.step = payload;
    },
    setCourse: (state, { payload }) => {
      state.course = payload;
    },
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
    setPaymentLoading: (state, { payload }) => {
      state.paymentLoading = payload;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.edit = false;
    },
  },
});

export const {
  setCourse,
  setEdit,
  setPaymentLoading,
  setSteps,
  setCategories,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
