import crypto from "crypto";

import { User, Course } from "../../models/index.js";
import mailSender from "../../utils/mailSender.util.js";
import { Types } from "mongoose";
import { RAZORPAY_SECRETE } from "../../config/index.js";

import instance from "../../config/razorpay.js";

import CustomErrorHandler from "../../services/customErrorHandler.js";
import courseEnrollmentMail from "../../template/courseEnrollmentMail.js";
import paymentSuccessEmail from "../../template/paymentSuccessful.js";

// for purchase multiple page
// => capture payment
export const capturePayment = async (req, res, next) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;
    if (courses.length <= 0) {
      return next(CustomErrorHandler.badRequest("Course id is required"));
    }
    if (!(await User.findById(userId))) {
      return next(CustomErrorHandler.unAuthorized("User not exist"));
    }

    let totalAmount = 0;
    for (const course_id of courses) {
      let course = await Course.findById(course_id);
      if (!course) {
        return next(CustomErrorHandler.badRequest("Course not found"));
      }

      const uid = new Types.ObjectId(userId);
      if (course.studentEnrolled.includes(uid)) {
        return next(
          CustomErrorHandler.forbidden(
            `You have already purchased this course (${course.courseName})`
          )
        );
      }
      totalAmount += course?.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };

    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      message: "Payment captured",
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// verify the signature
export const verifyPayment = async (req, res, next) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user?.id;
    console.log("verifiy payment");
    console.table([
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    ]);

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return next(CustomErrorHandler.badRequest("Payment failed"));
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_SECRETE)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature !== razorpay_signature) {
      return next(CustomErrorHandler.forbidden("Payment could not verify"));
    }

    // if signature match
    // enroll the student
    await enrollStudents(courses, userId, next);
    return res.status(200).json({
      success: true,
      message: "You have been enrolled to this course",
    });
  } catch (error) {
    return next(error);
  }
};

const enrollStudents = async (courses, userId, next) => {
  if (!courses || !userId) {
    return next(
      CustomErrorHandler.notFound("Please provide courses and user id")
    );
  }

  try {
    for (const courseId of courses) {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return next(
          CustomErrorHandler.serverError("Could not enroll the student")
        );
      }

      //find the student and add the course to their list
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: { courses: courseId },
        },
        { new: true }
      );

      // mail send to student
      const mailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentMail(enrolledCourse.courseName, enrolledStudent.name)
      );

      console.log("Enrolled success");
    }
  } catch (error) {
    return next(error);
  }
};

export const sendMail = async (req, res, next) => {
  try {
    console.log("sendMail");
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
    // console.table([orderId, paymentId, amount]);
    if (!orderId || !paymentId || !amount) {
      return next(
        CustomErrorHandler.notFound("All the fields are required sendmail")
      );
    }

    const enrolledStudent = await User.findById(userId);
    if (!enrolledStudent) {
      return next(CustomErrorHandler.forbidden("User not found"));
    }

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.name}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    res.status(200).json({
      success: true,
      message: "Payment successful",
    });
  } catch (error) {
    return next(error);
  }
};

// for purchase single page
// // capture the payment(mean user started to payment process)
// const capturePayment = async (req|| ! res, next) => {
//   /**
//    * flow how it works
//    * get user id and course id
//    * validate
//    * validate course id
//    * validate course details
//    * user already paying for same course
//    * create order
//    * return response
//    */
//   const { courseId } = req.body;
//   const userId = req.user.id;

//   // validate course id
//   if (!courseId) {
//     return next(CustomErrorHandler.badRequest("Course id is required!"));
//   }
//   // validate course details
//   let course;
//   try {
//     course = await Course.findById({ courseId });
//     if (!course) {
//       return next(CustomErrorHandler.notFound("Course not found"));
//     }

//     // user already exist
//     const uid = new Types.ObjectId(userId);
//     if (Course.studentEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "User already exist in this course",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return next(error);
//   }

//   const amount = course.amount;
//   const currency = "INR";
//   const option = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId: courseId,
//       userId,
//     },
//   };

//   try {
//     const paymentResponse = await instance.order.create(option);
//     console.log(paymentResponse);
//     return res.status(200).json({
//       success: false,
//       message: "Payment is captured successfully",
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.log(error);
//     return next(error);
//   }
// };

// const verifySignature = async (req, res, next) => {
//   const webhookSecrete = "1234578";
//   const signature = req.header("x-razorpay-signature");
//   const shasum = Crypto.createHmac("sha256", webhookSecrete);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature === webhookSecrete) {
//     console.log("Payment is Authorized");

//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       // fulfil the action

//       // find the course and enroll the student
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentEnrolled: userId } },
//         { new: true }
//       );

//       if (!enrolledCourse) {
//         return next(CustomErrorHandler.serverError("Course not found"));
//       }

//       // find the student and insert course entry
//       const studentEnrolled = await User.findOneAndUpdate(
//         { _id: userId },
//         { $push: { courses: courseId } },
//         { new: true }
//       );
//       console.log(studentEnrolled);

//       const emailResponse = await mailSender(
//         enrolledCourse.email,
//         "Congratulation from StudyNation",
//         `You have been enrolled in ${enrolledCourse.courseName}`
//       );
//       console.log(emailResponse);
//       return res.status(200).json({
//         success: true,
//         message: "Course enrollment is successful",
//       });
//     } catch (error) {
//       return next(error);
//     }
//   } else {
//     return next(CustomErrorHandler.badRequest("Invalid request"));
//   }
// };
