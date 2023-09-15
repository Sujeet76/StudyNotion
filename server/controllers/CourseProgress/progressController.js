import { Progress } from "../../models/index.js";
import CustomErrorHandler from "../../services/customErrorHandler.js";

export const updateCourseProgress = async (req, res, next) => {
  try {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    if (!courseId || !subsectionId) {
      return next(CustomErrorHandler.notFound("All the fields are required!!"));
    }

    const isProgress = await Progress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!isProgress) {
      return next(CustomErrorHandler.notFound("Course progress not found"));
    }
    console.log(isProgress);
    if (isProgress.completedVideos.includes(subsectionId)) {
      return res.status(200).json({
        success: true,
        message: "All ready marked as completed",
      });
    }

    isProgress.completedVideos.push(subsectionId);
    await isProgress.save();


    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
    });
  } catch (error) {
    return next(error);
  }
};
