import Razorpay from "razorpay";
import { User, Course } from "../../models/index.js";
import mailSender from "../../utils/mailSender.util.js";
import { Types } from "mongoose";
import instance from "../../config/index.js";

import CustomErrorHandler from "../../services/customErrorHandler.js";

// capture the payment(mean user started to payment process)
const capturePayment = async (req, res, next) => {
  /**
   * flow how it works
   * get user id and course id
   * validate
   * validate course id
   * validate course details
   * user already paying for same course
   * create order
   * return response
   */
  const { courseId } = req.body;
  const userId = req.user.id;

  // validate course id
  if (!courseId) {
    return next(CustomErrorHandler.badRequest("Course id is required!"));
  }
  // validate course details
  let course;
  try {
    course = await Course.findById({ courseId });
    if (!course) {
      return next(CustomErrorHandler.notFound("Course not found"));
    }

    // user already exist
    const uid = new Types.ObjectId(userId);
    if (Course.studentEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "User already exist in this course",
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }

  const amount = course.amount;
  const currency = "INR";
  const option = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: courseId,
      userId,
    },
  };

  try {
    const paymentResponse = await instance.order.create(option);
    console.log(paymentResponse);
    return res.status(200).json({
      success: false,
      message: "Payment is captured successfully",
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const verifySignature = async (req, res, next) => {
  const webhookSecrete = "1234578";
  const signature = req.header("x-razorpay-signature");
  const shasum = Crypto.createHmac("sha256", webhookSecrete);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === webhookSecrete) {
    console.log("Payment is Authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      // fulfil the action

      // find the course and enroll the student
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return next(CustomErrorHandler.serverError("Course not found"));
      }

      // find the student and insert course entry
      const studentEnrolled = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      console.log(studentEnrolled);

      const emailResponse = await mailSender(
        enrolledCourse.email,
        "Congratulation from StudyNation",
        `You have been enrolled in ${enrolledCourse.courseName}`
      );
      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Course enrollment is successful",
      });
    } catch (error) {
      return next(error);
    }
  } else {
    return next(CustomErrorHandler.badRequest("Invalid request"));
  }
};
