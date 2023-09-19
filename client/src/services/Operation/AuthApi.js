import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../Slice/auth";
import { apiConnector } from "../../utils/axios";
import { endpoints } from "../api";

import { Navigate } from "react-router-dom";

import {
  removeToLocalStorage,
  setToLocalStorage,
} from "../../utils/localStorage";
import { setProfile } from "../../Slice/profile";
import { resetCart } from "../../Slice/cart";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// why additional field ? => for validating the these fields before sending otp
export const sendotp = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  navigate
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const response = apiConnector("POST", SENDOTP_API, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    });
    toast.promise(response, {
      loading: "Validating your data... 😊",
      success: (response) => {
        console.log(response);
        navigate("/email-verify");
        dispatch(setLoading(false));
        return `OTP has been send check you email or spam folder 🔥`;
      },
      error: (err) => {
        const { response } = err;
        navigate("/signup");
        dispatch(setLoading(false));
        console.log(err);
        return `${response.data.message} 🙅‍♂️`;
      },
    });
  };
};

export const reSendOtp = (email) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const response = apiConnector("POST", SENDOTP_API, {
      email: email,
      isSignup: false,
    });
    toast.promise(response, {
      loading: "Re-sending otp... 😊",
      success: (response) => {
        dispatch(setLoading(false));
        return `OTP has been send check you email or spam folder 🔥`;
      },
      error: (err) => {
        const { response } = err;
        dispatch(setLoading(false));
        console.log(err);
        return `${response.data.message} 🙅‍♂️`;
      },
    });
  };
};

export const signup = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  otp,
  navigate
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const postUserData = apiConnector("POST", SIGNUP_API, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    });

    toast.promise(postUserData, {
      loading: "Verifying your data...",
      success: (postUserData) => {
        const { data } = postUserData;
        console.log(data);
        console.log(postUserData);
        console.log("signup success");
        navigate("/login");
        return `Signup success.Redirecting to login page`;
      },
      error: (err) => {
        const { response } = err;
        console.log("Error Block");
        console.log(response.data.message);
        console.log(response);
        return response.data.message;
      },
    });
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const response = apiConnector("POST", LOGIN_API, { email, password });

    toast.promise(response, {
      loading: "Verifying your data...",
      success: (response) => {
        const { data } = response;
        const { token } = data.data;
        dispatch(setLoading(false));
        dispatch(setToken(token));
        dispatch(setProfile(data.data));
        setToLocalStorage("token", token);
        // setToLocalStorage("user", data.data);
        navigate("/dashboard/my-profile");
        // dispatch()
        // console.log(data);
        return "Login successful 🔥";
      },
      error: (err) => {
        const { response } = err;
        console.log("while logging ", err);
        return `${response.data.message} 🙅‍♂️`;
      },
    });
  };
};

export const resetPassToken = (email, setSendEmail) => {
  return async (dispatch) => {
    dispatch(setLoading(false));
    const fetchData = apiConnector("POST", RESETPASSTOKEN_API, { email });

    toast.promise(fetchData, {
      loading: "Validating your data... 😃",
      success: (fetchData) => {
        const { data } = fetchData;
        console.log(fetchData);
        dispatch(setLoading(false));
        setSendEmail(true);
        return data.message;
      },
      error: (err) => {
        const { response } = err;
        console.log(err);
        return response.data.message;
      },
    });
  };
};

export const resetPassword = (password, confirmPassword, token, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const resetRes = apiConnector("POST", RESETPASSWORD_API, {
      password,
      confirmPassword,
      token,
    });

    toast.promise(resetRes, {
      loading: "Validating your data...",
      success: (resetRes) => {
        const { data } = resetRes;
        dispatch(setLoading(false));
        navigate("/login");
        return data?.message;
      },
      error: (err) => {
        const { response } = err;
        console.log("=>", err);
        return response?.data?.message ?? "Error in reset password";
      },
    });
  };
};

export const logout = (navigate, isMessage) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setProfile(null));
    dispatch(resetCart());
    removeToLocalStorage("token");
    if (!isMessage) {
      toast.success("Logout successful 🔥");
      Navigate({ to: "/" });
      return;
    }
    Navigate({ to: "/" });
    toast.error(isMessage);
  };
};
