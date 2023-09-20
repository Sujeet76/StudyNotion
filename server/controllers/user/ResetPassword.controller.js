import { hash } from "bcrypt";
import { User } from "../../models/index.js";
import mailSender from "../../utils/mailSender.util.js";
import crypto from "crypto";
import CustomErrorHandler from "../../services/customErrorHandler.js";
import Joi from "joi";

// Generate Token for reset password
const resetPasswordToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.unAuthorized("User not found"));
    }
    // generate toke using crypto
    const token = crypto.randomUUID();
    const updateDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        expirationTime: new Date(new Date().getTime() + 5 * 60000),
      },
      { new: true }
    );
    // generate like to reset password
    const url = `https://studynotion-edtech-pied.vercel.app/update-password/${token}`;
    const  resp = await mailSender(
      email,
      "Link to reset password from StudyNotion",
      `click to reset password :  ${url}`
    );
    console.log(resp)
    return res.status(200).json({
      success: true,
      message: "Link send successfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  /**
   * flow how it work
   * => fetch data from req
   * =>validate password and conform password
   * =>get user details from DB using token
   * =>if user not found the return res
   * =>check token time not expire
   * =>hash the password
   * =>update the password
   * =>return the response
   */
  try {
    const { password, confirmPassword, token } = req.body;
    // console.table([password, confirmPassword, token]);
    if (!token) {
      return next(CustomErrorHandler.badRequest("Reset token is required"));
    }
    const user = await User.findOne({ token });
    // console.log(user);
    if (!user) {
      return next(CustomErrorHandler.unAuthorized("Invalid User"));
    }

    // console.log("DB", user.expirationTime, new Date());
    if (user.expirationTime < new Date()) {
      return next(CustomErrorHandler.badRequest("Token has been expired"));
    }

    const registerSchema = Joi.object({
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
      token: Joi.string().required(),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const hashPassword = await hash(password, 10).catch((e) => {
      return next(e);
    });

    await User.findOneAndUpdate(
      { token: token },
      { password: hashPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export { resetPasswordToken, resetPassword };
