import { toast } from "react-hot-toast";
import { setLoading, setProfile } from "../../Slice/profile";
import { logout } from "../Operation/AuthApi";
import { apiConnector } from "../../utils/axios";
import { profileEndpoints } from "../api";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

export const getUserDetails = (token, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const responseData = apiConnector("GET", GET_USER_DETAILS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    toast.promise(responseData, {
      loading: "Getting you details...",
      success: (responseData) => {
        const { data } = responseData;
        dispatch(setLoading(false));
        dispatch(setProfile(data.data));
        return `Welcome back ${data.data.name}`;
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        dispatch(setLoading(false));
        if (response?.status === 401) {
          dispatch(logout(navigate, ""));
          navigate("/");
          return "Invalid user,please Login again !!";
        }
        return response?.data?.message ?? "Error while fetching user data";
      },
    });
  };
};

export const getEnrolledCourses = async (token, setIsLoading, dispatch) => {
  let toastId = null;
  try {
    setIsLoading(true);
    toastId = toast.loading("Fetching enrolled course");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    );

    const { data } = response;
    toast.success("Operation successful!!", {
      id: toastId,
    });
    setIsLoading(false);
    return data?.data;
  } catch (err) {
    const { response } = err;
    console.log(response);
    setIsLoading(false);
    if (response?.status === 401) {
      dispatch(logout(navigate, "Invalid user,Login again"));
      toast.dismiss(toastId);
      return;
    }
    const errorMessage =
      response?.data?.data?.message ?? "Error while getting enrolled course";
    toast.error(errorMessage, {
      id: toastId,
    });
    return null;
  }
};

export const getInstructorData = async (token, setIsLoading) => {
  let toastId = null;
  try {
    toastId = toast.loading("Fetching course stats!!");

    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    const { data } = response;
    setIsLoading(false);
    toast.dismiss(toastId);
    return data?.data;
  } catch (err) {
    const { response } = err;
    console.log(response);
    setIsLoading(false);
    const errorMessage =
      response?.data?.data?.message ?? "Error while getting enrolled course";
    toast.error(errorMessage, {
      id: toastId,
    });
    return [];
  }
};
