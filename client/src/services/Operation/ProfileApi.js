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
        console.log(response.status);
        dispatch(setLoading(false))
        if (response?.status === 401) {
          dispatch(logout(navigate));
          return "Invalid user,please Login again !!";
        }
        return response?.data?.message ?? "Error while fetching user data";
      },
    });
  };
};
