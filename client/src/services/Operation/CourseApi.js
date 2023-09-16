import { toast } from "react-hot-toast";
import { apiConnector } from "../../utils/axios";

import { getToLocalStorage, setToLocalStorage } from "../../utils/localStorage";

import { categories } from "../api";
import { courseEndpoints } from "../api";
import { catalogData } from "../api";

import {
  setCourse,
  setEdit,
  setSteps,
  setCategories,
} from "../../Slice/course";
import {
  setIsLoading as viewCourseLoading,
  setSectionData,
  setEntireData,
  setCompletedLecture,
  setTotalLecture,
  updateCompletedLecture,
} from "../../Slice/viewCourseVideo";

const { CATEGORIES_API } = categories;
const { CATALOGPAGEDATA_API } = catalogData;

const {
  EDIT_COURSE_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  GET_ALL_COURSE_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  COURSE_DETAILS_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  UPDATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  LECTURE_COMPLETION_API,
  GET_STUDENT_COURSE_DETAILS,
  CREATE_RATING_API,
} = courseEndpoints;

export const getCategory = (setIsLoading) => {
  return async (dispatch) => {
    const response = apiConnector("GET", CATEGORIES_API);
    if (setIsLoading) setIsLoading(true);
    toast.promise(response, {
      loading: "Setting category data",
      success: (response) => {
        const { data } = response;
        const result = data?.CategoryData;
        dispatch(setCategories(result));
        if (setIsLoading) setIsLoading(false);
        return "every thing is on it place";
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        if (setIsLoading) setIsLoading(false);
        return response?.data?.message || "Error while getting category data";
      },
    });
  };
};

export const createCourse = (formData, token, setLoading) => {
  return async (dispatch) => {
    const res = apiConnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Barer ${token}`,
    });
    setLoading(true);
    toast.promise(res, {
      loading: "Creating course,Please wait !!",
      success: (res) => {
        const { data } = res;
        const result = data?.data;
        console.log(result);
        dispatch(setCourse(result));
        dispatch(setSteps(2));
        setLoading(false);

        // already pending course
        const existingPendingCourse = getToLocalStorage(
          "PendingCourseToCreate"
        );
        if (existingPendingCourse) {
          let newArr = [];
          newArr = JSON.parse(existingPendingCourse);
          newArr.push(result?._id);
          setToLocalStorage("PendingCourseToCreate", newArr);
        }

        return "Course is created successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        setLoading(false);
        return response?.data?.message || "Error while creating course";
      },
    });
  };
};

export const editCourse = (
  formData,
  token,
  setLoading,
  navigate,
  navigateTo
) => {
  let result = null;
  return async (dispatch) => {
    setLoading(true);
    const res = apiConnector("POST", EDIT_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Barer ${token}`,
    });

    toast.promise(res, {
      loading: "Updating course,Please wait !!",
      success: (res) => {
        const { data } = res;
        result = data?.data;
        dispatch(setCourse(result));
        dispatch(setSteps(2));
        setLoading(false);
        if (navigate) navigate(navigateTo);
        return "Course updated successfully";
      },
      error: (err) => {
        const { response } = err;
        setLoading(false);
        return response?.data?.message ?? "Error while updating course";
      },
    });
  };
};

// export const fetchCourse = (token) => {
//   return async (dispatch) => {
//     const response = apiConnector("GET", COURSE_DETAILS_API, null, {
//       Authorization: `Barer ${token}`,
//     });

//     toast.promise(response, {
//       loading: "Fetching course data!!",
//       success: (response) => {
//         const { data } = response;
//         const result = data?.data;
//         console.log(data);
//         console.log(data?.data);
//         dispatch(setCourse(result));
//         return "Course fetched successfully";
//       },
//       error: (err) => {
//         const { response } = err;
//         console.log(response);
//         console.log(err);
//         return response?.data?.message ?? "Error while fetching course";
//       },
//     });
//   };
// };

export const createSection = (sectionName, courseId, token) => {
  return async (dispatch) => {
    const response = apiConnector(
      "POST",
      CREATE_SECTION_API,
      { sectionName, courseId },
      { Authorization: `Barer ${token}` }
    );

    toast.promise(response, {
      loading: "Creating section, Please wait !!",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        // console.log(data);
        console.log(result);
        dispatch(setCourse(result));
        return "Section created successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        console.log(err);
        return response?.data?.message ?? "Error while creating course";
      },
    });
  };
};

export const createSubSection = (
  formData,
  token,
  course,
  modalData,
  setModalData,
  setLoading
) => {
  return async (dispatch) => {
    const response = apiConnector("POST", CREATE_SUBSECTION_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Barer ${token}`,
    });

    if (setLoading) setLoading(true);
    toast.promise(response, {
      loading: "Creating subsection, Please wait !!",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData ? result : section
        );
        const updatedCourse = {
          ...course,
          courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
        setModalData(null);
        if (setLoading) setLoading(false);
        return "Successfully created subsection";
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        console.log(response);
        if (setLoading) setLoading(false);
        return response?.data?.message ?? "Error while creating subsection";
      },
    });
  };
};

// delete operation
export const deleteSection = (_id, courseId, token) => {
  return async (dispatch) => {
    const response = apiConnector(
      "DELETE",
      DELETE_SECTION_API,
      { sectionId: _id, courseId },
      {
        Authorization: `Barer ${token}`,
      }
    );

    toast.promise(response, {
      loading: "Deleting section please await",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        dispatch(setCourse(result));
        return "Section deleted successfully";
      },
      error: (err) => {
        const { response } = err;
        return response?.data?.message ?? "Error while deleting section";
      },
    });
  };
};

export const deleteSubsection = (sectionId, subSectionId, token, course) => {
  return async (dispatch) => {
    const response = apiConnector(
      "DELETE",
      DELETE_SUBSECTION_API,
      { sectionId, subSectionId },
      {
        Authorization: `Barer ${token}`,
      }
    );

    toast.promise(response, {
      loading: "Deleting subsection, Please wait",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        // console.log(result);
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === sectionId ? result : section
        );
        const updatedCourse = {
          ...course,
          courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
        return "subsection deleted successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        return response?.data?.message ?? "Error while deleting subsection";
      },
    });
  };
};

export const deleteCourse = (
  courseId,
  token,
  setCourses,
  courses,
  setConfirmationModal
) => {
  return async (dispatch) => {
    const response = apiConnector(
      "DELETE",
      DELETE_COURSE_API,
      { courseId },
      { Authorization: `Barer ${token}` }
    );

    toast.promise(response, {
      loading: "Deleting course please wait",
      success: (response) => {
        const { data } = response;
        console.log(data);
        const newCourse = courses.filter(
          (data) => data.content._id !== courseId
        );
        console.log(newCourse);
        setCourses(newCourse);
        setConfirmationModal(null);
        return data?.message ?? "course Deleted successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        return response?.data?.message ?? "Error while Deleting course";
      },
    });
  };
};

// update operation
export const updateSection = (sectionName, sectionId, courseId, token) => {
  return async (dispatch) => {
    const response = apiConnector(
      "POST",
      UPDATE_SECTION_API,
      { sectionId, sectionName, courseId },
      { Authorization: `Barer ${token}` }
    );

    toast.promise(response, {
      loading: "Updating section name !!",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        dispatch(setCourse(result));
        return "Section name updated successfully!!";
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        return (
          response?.data?.message ??
          err?.message ??
          "Error while update section name"
        );
      },
    });
  };
};

export const updateSubsection = (
  formData,
  sectionId,
  token,
  course,
  setModalData,
  setLoading
) => {
  return async (dispatch) => {
    const response = apiConnector("POST", UPDATE_SUBSECTION_API, formData, {
      Authorization: `Barer ${token}`,
    });

    if (setLoading) {
      setLoading(true);
    }

    toast.promise(response, {
      loading: "Updating subsection, Please wait",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        // console.log(result);
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === sectionId ? result : section
        );
        const updatedCourse = {
          ...course,
          courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
        setModalData(null);
        if (setLoading) setLoading(false);
        return "subsection updated successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        console.log(err);
        if (setLoading) setLoading(false);
        return response?.data?.message ?? "Error while updating subsection";
      },
    });
  };
};

// get instructor course
export const getInstructorCourses = (
  token,
  setIsLoading,
  setCourses,
  page = 1,
  setTotalCourse
) => {
  return async (dispatch) => {
    setIsLoading(true);
    const response = apiConnector(
      "GET",
      `${GET_ALL_INSTRUCTOR_COURSES_API}?page=${page}`,
      null,
      {
        Authorization: `Barer ${token}`,
      }
    );

    toast.promise(response, {
      loading: "Fetching your courses",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        setCourses(result);
        if (setTotalCourse) {
          setTotalCourse(data?.totalCourse);
        }
        // console.log(data);
        setIsLoading(false);
        return "Instructor course fetched successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        // console.log(response)
        setIsLoading(false);
        return (
          response?.data?.message ?? "Error while fetching instructor course"
        );
      },
    });
    // setIsLoading(false);
  };
};

export const getFullCourseDetails = (courseId, token, setIsLoading) => {
  return async (dispatch) => {
    const response = apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Barer ${token}` }
    );

    setIsLoading(true);

    toast.promise(response, {
      loading: "Fetching course Details",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        console.log(result);
        dispatch(setCourse(result.courseDetail));
        dispatch(setEdit(true));
        dispatch(setSteps(1));
        setIsLoading(false);
        return "Course fetched successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        setIsLoading(false);
        return response?.data?.message ?? "Error while fetching course details";
      },
    });
  };
};

export const getCategoryPageDetails = async ({
  categories,
  categoryName,
  setIsLoading,
}) => {
  setIsLoading(true);
  let categoryData = null;

  // Find the matching categoryData
  categories.forEach((content) => {
    if (content.categoryName === categoryName) categoryData = content;
  });

  if (!categoryData) {
    toast.error("Category data not found");
    setIsLoading(false);
    return {
      categoryData: null,
      result: null,
    };
  }

  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
      categoryId: categoryData?._id,
    });

    const { data } = response;
    setIsLoading(false);

    return {
      categoryData,
      result: data, // Update result with the API response data
    };
  } catch (err) {
    const { response } = err;
    console.error(err);
    setIsLoading(false);
    const errorMessage =
      response?.data?.message ?? "Error while fetching category details";

    return {
      categoryData,
      result: null, // Set result to null in case of an error
      errorMessage,
    };
  }
};

export const courseDetails = async (courseId, setIsLoading) => {
  let toastId;
  try {
    let result = null;
    setIsLoading(true);
    toastId = toast.loading("Please wait, Setting page data!!");
    const response = await apiConnector("GET", COURSE_DETAILS_API, null, null, {
      courseId: courseId,
    });
    const { data } = response;
    setIsLoading(false);
    toast.success("Setup complete!!", {
      id: toastId,
    });
    console.log("-----> ", data?.data);
    return { result: data?.data };
  } catch (err) {
    const { response } = err;
    console.log(response);
    console.error(err);
    setIsLoading(false);
    const errorMessage =
      response?.data?.message ?? "Error while fetching course details";
    toast.error(errorMessage, {
      id: toastId,
    });
    return { result: null };
  }
};

// get CourseApi auth -> student
export const getStudentCourseDetails = async (courseId, token, dispatch) => {
  let toastId = null;
  try {
    dispatch(viewCourseLoading(true));
    toastId = toast.loading("Fetching your course details");
    const response = await apiConnector(
      "POST",
      GET_STUDENT_COURSE_DETAILS,
      { courseId: courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    const { data } = response;
    // set section data
    console.log("000=> ", data);
    dispatch(setSectionData(data?.courseDetails?.courseContent));
    const result = {
      ...data?.courseDetails,
      totalDuration: data?.totalDuration,
    };
    delete result?.courseContent;
    // set entire data => after deleting courseContent -> to prevent duplicate courseContent as it is set above
    dispatch(setEntireData(result));
    // set complete video id
    dispatch(setCompletedLecture(data?.completedVideo));
    // calculate total lecture
    let totalLecture = 0;
    data?.courseDetails?.courseContent?.forEach((section) => {
      totalLecture += section?.subSection?.length ?? 0;
    });

    dispatch(setTotalLecture(totalLecture));

    console.log(data);
    toast.success("Course data fetched successfully", {
      id: toastId,
    });
    dispatch(viewCourseLoading(false));
    return data;
  } catch (err) {
    const { response } = err;
    console.log(response);
    console.error(err);
    dispatch(viewCourseLoading(false));
    const errorMessage =
      response?.data?.message ?? "Error while fetching student course details";
    toast.error(errorMessage, {
      id: toastId,
    });
    return null;
  }
};

export const updateCourseProgress = async (
  token,
  courseId,
  subsectionId,
  dispatch
) => {
  let toastId = null;

  try {
    toastId = toast.loading("Please wait, marking as complete");
    const response = await apiConnector(
      "POST",
      LECTURE_COMPLETION_API,
      {
        courseId: courseId,
        subsectionId: subsectionId,
      },
      { Authorization: `Bearer ${token}` }
    );
    const { data } = response;
    dispatch(updateCompletedLecture(subsectionId));
    const successMessage =
      data?.data?.message ?? "Lecture is marked as completed";
    toast.success(successMessage, { id: toastId });
  } catch (err) {
    const { response } = err;
    console.log(response);
    console.error(err);
    const errorMessage =
      response?.data?.message ?? "Could not mark as complete lecture";
    toast.error(errorMessage, {
      id: toastId,
    });
  }
};

// review and rating
export const reviewAndRating = async (token, reviewData, setReviewModal) => {
  let toastId = null;
  try {
    toastId = toast.loading("Please wait, creating review");

    const response = await apiConnector("POST", CREATE_RATING_API, reviewData, {
      Authorization: `Bearer ${token}`,
    });

    const { data } = response;
    const successMessage = data?.data?.message ?? "Review created successfully";
    setReviewModal(false);
    toast.success(successMessage, { id: toastId });
    return;
  } catch (err) {
    const { response } = err;
    console.log(response);
    console.error(err);
    const errorMessage =
      response?.data?.message ?? "Could not register your review";
    toast.error(errorMessage, {
      id: toastId,
    });
    return;
  }
  // toast.dismiss(toastId);
};
