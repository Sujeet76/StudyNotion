import { Schema, model } from "mongoose";
import mailSender from "../utils/mailSender.util.js";
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
      otp
    );
    // if (!mailResponse) {
    //   console.log("mail response is null");
    // }
    // console.log("Email send successfully", mailResponse);
  } catch (e) {
    console.log("Error while sending mail Error : ", e.message);
  }
}
// pre middleware -> first verify the top then create the user schema
otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

export default model("OTP", otpSchema);
