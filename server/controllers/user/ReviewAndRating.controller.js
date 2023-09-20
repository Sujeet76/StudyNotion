import { Course, ReviewAndLike } from "../../models/index.js";
import { Schema } from "mongoose";
import CustomErrorHandler from "../../services/customErrorHandler.js";

const createReviewAndLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return next(
        CustomErrorHandler.unAuthorized("You are not enrolled in this course")
      );
    }

    // user already reviewed the course
    const alreadyReviewed = await ReviewAndLike.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return next(CustomErrorHandler.badRequest("Already reviewed the course"));
    }

    const reviewRating = await ReviewAndLike.create({
      user: userId,
      rating: rating,
      review: review,
      course: courseId,
    });

    await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: { ratingAndReview: reviewRating._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Student reviewed the course successfully",
      data: review,
    });
  } catch (error) {
    return next(error);
  }
};

const getAverageRating = async (req, res, next) => {
  try {
    const courseId = req.body.courseId;
    const result = await ReviewAndLike.aggregate([
      { $match: { course: Schema.Types.ObjectId(courseId) } },
      { $group: { _id: null, average: { $avg: "$rating" } } },
    ]);
    // console.log({ result });
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        data: result[0],
      });
    }
    return res.status(200).json({
      success: false,
      message: "found not found",
      data: 0,
    });
  } catch (error) {
    return next(error);
  }
};

// get all rating
const getAllRating = async (req, res, next) => {
  try {
    const allRating = await ReviewAndLike.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "name email description img",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    if (!allRating) {
      return next(CustomErrorHandler.badRequest("Not reviewed any course yet"));
    }

    return res.status(200).json({
      success: true,
      message: "Rating fetched successfully",
      data: allRating,
    });
  } catch (error) {
    return next(error);
  }
};

export { getAllRating, createReviewAndLike, getAverageRating };
