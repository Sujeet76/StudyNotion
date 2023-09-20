import { apiConnector } from "../../utils/axios";

import { settingsEndpoints } from "../api";
import { setLoading, setProfile, setProfileImg } from "../../Slice/profile";
import { setLoading as authLoading } from "../../Slice/auth";
import { toast } from "react-hot-toast";
import { logout } from "./AuthApi";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

/**
 * update profile
 * gender,
 * dateOfBirth,
 * about = "",
 * contactNumber,
 * address = "",
 * ----------------
 * update picture
 * =>displayPicture
 * -------------------
 * changePass
 * => currentPassword,newPassword
 *
 * delete account
 * =>user_id -> auth
 */

export const updateProfileImg = (formData, token, navigate) => {
  console.table([formData, token]);
  return async (dispatch) => {
    dispatch(setLoading(true));

    const responseData = apiConnector(
      "PUT",
      UPDATE_DISPLAY_PICTURE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    toast.promise(responseData, {
      loading: "Validating credential...",
      success: (responseData) => {
        const { data } = responseData;
        dispatch(setLoading(false));
        // dispatch(setProfile(data.data.img));
        dispatch(setProfileImg(data.data.img));
        return `Profile pic update successfully`;
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        dispatch(setLoading(false));
        if (response?.status === 401) {
          dispatch(logout(navigate));
          return "Invalid user,please Login again !!";
        }
        return response?.data?.message ?? "Error while updating profile image";
      },
    });
  };
};

export const updateProfileData = ({
  name,
  gender,
  dateOfBirth,
  about,
  contactNumber,
  address,
  token,
  navigate,
}) => {
  console.table([
    name,
    gender,
    dateOfBirth,
    about,
    contactNumber,
    address,
    token,
  ]);
  return async (dispatch) => {
    dispatch(setLoading(true));

    const responseData = apiConnector(
      "PUT",
      UPDATE_PROFILE_API,
      {
        name,
        gender,
        dateOfBirth,
        about,
        contactNumber,
        address,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.promise(responseData, {
      loading: "Validating credential...",
      success: (responseData) => {
        const { data } = responseData;
        dispatch(setLoading(false));
        dispatch(setProfile(data.data));
        return `Profile update successfully`;
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        dispatch(setLoading(false));
        if (response?.status === 401) {
          dispatch(logout(navigate));
          return "Invalid user,please Login again !!";
        }
        return response?.data?.message ?? "Error while updating profile image";
      },
    });
  };
};

export const changePassword = (currentPassword, newPassword, token) => {
  return async (dispatch) => {
    dispatch(authLoading(true));
    const fetchData = apiConnector(
      "PATCH",
      CHANGE_PASSWORD_API,
      { currentPassword, newPassword },
      { Authorization: `Bearer ${token}` }
    );

    const id = toast.promise(fetchData, {
      loading: "Validating your data...",
      success: (fetchData) => {
        const { data } = fetchData;
        // console.log(data?.data);
        dispatch(setLoading(false));
        return `${data.message} 🚀`;
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        if (response?.status === 401) {
          dispatch(logout(navigate));
          return "Invalid user,please Login again !!";
        }
        return response?.data?.message ?? "Error while updating password";
      },
    });
    toast.dismiss(id);
    dispatch(authLoading(false));
  };
};

export const deleteUser = (token, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    const fetchData = apiConnector("DELETE", DELETE_PROFILE_API, null, {
      Authorization: `Barer ${token}`,
    });

    const id = toast.promise(fetchData, {
      loading: "Validating your credential...",
      success: (fetchData) => {
        const { data } = fetchData;
        dispatch(setLoading(false));
        dispatch(logout(navigate, false));
        return `${data.message} 🚀`;
      },
      error: (err) => {
        const { response } = err;
        console.log(response);
        if (response?.status === 401) {
          dispatch(logout(navigate, false));
          return "Invalid user,please Login again !!";
        }
        return response?.data?.message ?? "Account delete successfully";
      },
    });
    dispatch(setLoading(false));
    toast.dismiss(id);
  };
};
