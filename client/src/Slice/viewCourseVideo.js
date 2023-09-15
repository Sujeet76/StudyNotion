import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLecture: [],
  totalNumberOfLecture: 0,
  isLoading: false,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setSectionData: (state, { payload }) => {
      state.courseSectionData = payload;
    },
    setEntireData: (state, { payload }) => {
      state.courseEntireData = payload;
    },
    setCompletedLecture: (state, { payload }) => {
      state.completedLecture = payload;
    },
    updateCompletedLecture : (state,{payload}) => {
      state.completedLecture.push(payload)
    },
    setTotalLecture: (state, { payload }) => {
      state.totalNumberOfLecture = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    resetViewCourse: (state) => {
      (state.completedLecture = []),
        (state.courseEntireData = []),
        (state.completedLecture = []),
        (state.totalNumberOfLecture = 0);
    },
  },
});

export const {
  setSectionData,
  setCompletedLecture,
  setEntireData,
  setTotalLecture,
  resetViewCourse,
  setIsLoading,
  updateCompletedLecture
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
