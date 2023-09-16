import CustomErrorHandler from "../services/customErrorHandler.js";
import contactUsEmail from "../template/contactUs.js";
import mailSender from "../utils/mailSender.util.js";

export const contactUs = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      return next(CustomErrorHandler.notFound("All the fields are required"));
    }

    if (phoneNumber.length !== 10) {
      return next(CustomErrorHandler.forbidden("Invalid phone number"));
    }

    const mailResponse = await mailSender(
      email,
      "Email send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNumber)
    );

    return res.status(200).json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    return next(error);
  }
};
