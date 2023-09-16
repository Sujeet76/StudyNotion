import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";

import CustomErrorHandler from "../../services/customErrorHandler.js";
import JwtService from "../../services/JwtService.js";

// importing models
import { OTP, User, Profile } from "../../models/index.js";
import Joi from "joi";

// generateOTP
const generateOtp = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      isSignup,
    } = req.body;
    // checking user exist
    const userExist = await User.exists({ email });
    if (userExist) {
      return next(CustomErrorHandler.alreadyExist("This email already exist"));
    }

    // password
    if (isSignup) {
      const registerSchema = Joi.object({
        firstName: Joi.string()
          .min(4)
          .max(30)
          .regex(/^[a-zA-Z0-9]+$/)
          .required()
          .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.min": "Name should have a minimum length of {#limit}",
            "string.max": "Name should have a maximum length of {#limit}",
            "string.pattern.base": "Name must contain only characters",
            "any.required": "Name is required",
          }),
        lastName: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .min(8)
          .max(20)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          )
          .trim()
          .disallow(Joi.string().regex(/\s/)) // Disallow spaces
          .required()
          .messages({
            "string.pattern.base":
              "Password must contain an uppercase letter, lowercase letter, a special symbol, and a number.",
            "string.min": "Password length must be at least 8 characters.",
            "string.max": "Password length cannot exceed 20 characters.",
            "string.empty": "Password is required.",
            "string.disallow": "Password must not contain spaces.",
          }),
        confirmPassword: Joi.valid(Joi.ref("password")).messages({
          "any.only": "Password does not match",
          "any.required": "Confirm password is required",
        }),
        accountType: Joi.string().required().messages({
          "any.required": "Account type is required",
        }),
      });
      const { error } = registerSchema.validate(req.body);

      if (error) {
        return next(error);
      }
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // checking otp is unique
    let uniqueOtp = await OTP.findOne({ otp });
    while (uniqueOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      uniqueOtp = await OTP.findOne({ otp });
    }
    try {
      const otpSchema = await OTP.create({
        email: email,
        otp: otp.toString(),
      });
      // console.log(otpSchema);
    } catch (error) {
      console.log(error);
      return next(
        CustomErrorHandler.serverError("Error while creating otp entry in db")
      );
    }

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
    });
  } catch (error) {
    return next(CustomErrorHandler.serverError(error.message));
  }
};

const signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    const findUser = await User.exists({ email });
    if (findUser) {
      return next(CustomErrorHandler.alreadyExist("This email already exist"));
    }

    const registerSchema = Joi.object({
      firstName: Joi.string()
        .min(4)
        .max(30)
        .regex(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({
          "string.base": "Name must be a string",
          "string.empty": "Name is required",
          "string.min": "Name should have a minimum length of {#limit}",
          "string.max": "Name should have a maximum length of {#limit}",
          "string.pattern.base": "Name must contain only characters",
          "any.required": "Name is required",
        }),
      lastName: Joi.string().optional(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .max(20)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .trim()
        .disallow(Joi.string().regex(/\s/)) // Disallow spaces
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain an uppercase letter, lowercase letter, a special symbol, and a number.",
          "string.min": "Password length must be at least 8 characters.",
          "string.max": "Password length cannot exceed 20 characters.",
          "string.empty": "Password is required.",
          "string.disallow": "Password must not contain spaces.",
        }),
      confirmPassword: Joi.valid(Joi.ref("password")).messages({
        "any.only": "Password does not match",
        "any.required": "Confirm password is required",
      }),
      accountType: Joi.string().required().messages({
        "any.required": "Account type is required",
      }),
      otp: Joi.string().required().messages({
        "any.required": "OTP type is required",
      }),
    });
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const recentOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // console.log(recentOTP, otp);
    if (!recentOTP) {
      return next(CustomErrorHandler.notFound("OTP not found"));
    }

    if (recentOTP.otp != otp) {
      return next(CustomErrorHandler.unAuthorized("OTP does not match"));
    }

    // const name = `${firstName} ${lastName}`;
    let encryptedPassword;
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      encryptedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
      return next(error);
    }
    const profile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
      address: null,
    });

    const userBody = await User.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: encryptedPassword,
      accountType: accountType,
      additionDetails: profile._id,
      img: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    userBody.additionDetails = profile;
    const payload = {
      email: userBody.email,
      id: userBody._id,
      role: userBody.accountType,
    };
    let token = await JwtService.sign(payload, "2h");
    userBody.token = token;
    userBody.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Sign up successful",
      user: userBody,
    });
  } catch (error) {
    return next(error);
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        CustomErrorHandler.badRequest("All the field are required!!")
      );
    }
    // console.log(email, password);
    let user = await User.findOne({ email: email }).populate("additionDetails");
    // console.log(user);
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials());
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.accountType,
    };
    let token = await JwtService.sign(payload, "2h");
    user.token = token;
    const userData = user.toObject();
    // user.password = undefined;
    delete userData.password;
    console.log(userData);

    res.status(200).json({
      success: true,
      data: userData,
      message: "Login successful",
    });
  } catch (error) {
    console.log("Error while sign up");
    console.log(error.message);
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, ...requestBody } = req.body;
    // cl;
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return next(
        CustomErrorHandler.unAuthorized("Unauthorize! User not found!")
      );
    }
    const registerSchema = Joi.object({
      currentPassword: Joi.string().required().messages({
        "string.empty": "Current password is required.",
      }),
      newPassword: Joi.string()
        .min(8)
        .max(20)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .trim()
        .disallow(Joi.string().regex(/\s/)) // Disallow spaces
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain an uppercase letter, lowercase letter, a special symbol, and a number.",
          "string.min": "Password length must be at least 8 characters.",
          "string.max": "Password length cannot exceed 20 characters.",
          "string.empty": "New password is required.",
          "string.disallow": "Password must not contain spaces.",
        }),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const match = await bcrypt.compare(currentPassword, userDetails.password);
    if (!match) {
      return next(
        CustomErrorHandler.forbidden("current password does not match!")
      );
    }

    let encryptedPassword;
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      encryptedPassword = await bcrypt.hash(req.body.newPassword, salt);
    } catch (error) {
      console.log("login", { error });
      return next(error);
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { password: encryptedPassword },
      { new: true }
    );

    if (!updateUser) {
      return next(error);
    }

    return res.status(200).json({
      success: true,
      message: `Password update successfully`,
    });
  } catch (error) {
    console.log("change : ", error);
    return next(error);
  }
};

export { generateOtp, signup, login, changePassword };
