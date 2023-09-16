import { Schema, model } from "mongoose";
import mailSender from "../utils/mailSender.util.js";
import otpTemplate from "../template/otp.template.js";
// // not complete
const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  // error may occur
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// function to send mail
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verifications mail by StudyNotion",
      otpTemplate(otp)
    );
  } catch (e) {
    console.log("Error while sending mail Error : ", e.message);
  }
}
// pre middleware -> first verify the top then create the user schema
otpSchema.pre("save", async function (next) {
  try {
    if (this.isNew) await sendVerificationEmail(this.email, this.otp);
    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

export default model("OTP", otpSchema);
