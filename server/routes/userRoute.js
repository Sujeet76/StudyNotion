// import library
import { Router } from "express";
import {
  login,
  signup,
  generateOtp,
  changePassword,
  resetPassword,
  resetPasswordToken,
} from "../controllers/index.js";

// import middleware
import { auth } from "../middleware/auth.js";

const userRoute = new Router();

// signup
userRoute.post("/signup", signup);

// send otp
userRoute.post("/sendotp", generateOtp);

// login
userRoute.post("/login", login);

// change password
userRoute.patch("/change-password", auth, changePassword);

// -----password reset------//
// generate token
userRoute.post("/reset-password-token", resetPasswordToken);

// actual route to reset password
userRoute.post("/reset-password", resetPassword);

export default userRoute;
