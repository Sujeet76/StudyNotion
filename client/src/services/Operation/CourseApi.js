import { toast } from "react-hot-toast";
import { apiConnector } from "../../utils/axios";

import { getToLocalStorage, setToLocalStorage } from "../../utils/localStorage";

import { categories } from "../api";
import { courseEndpoints } from "../api";

import {
  setCourse,
  setEdit,
  setSteps,
  setCategories,
} from "../../Slice/course";

const { CATEGORIES_API } = categories;

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

export const fetchCourse = (token) => {
  return async (dispatch) => {
    const response = apiConnector("GET", COURSE_DETAILS_API, null, {
      Authorization: `Barer ${token}`,
    });

    toast.promise(response, {
      loading: "Fetching course data!!",
      success: (response) => {
        const { data } = response;
        const result = data?.data;
        console.log(data);
        console.log(data?.data);
        dispatch(setCourse(result));
        return "Course fetched successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        console.log(err);
        return response?.data?.message ?? "Error while fetching course";
      },
    });
  };
};

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
  setModalData
) => {
  return async (dispatch) => {
    const response = apiConnector("POST", CREATE_SUBSECTION_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Barer ${token}`,
    });

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
        return "Successfully created subsection";
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        console.log(response);
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
  setModalData
) => {
  return async (dispatch) => {
    const response = apiConnector("POST", UPDATE_SUBSECTION_API, formData, {
      Authorization: `Barer ${token}`,
    });

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
        return "subsection updated successfully";
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        console.log(err);
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
  page = 1
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
        // console.log(result);
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
