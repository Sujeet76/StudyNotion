import Joi from "joi";

import { User, Profile, Course, Progress } from "../../models/index.js";
import uploadToCloudinary, {
  deleteToCloudinary,
} from "../../utils/imageUploader.util.js";
import { CLOUD_FOLDER } from "../../config/index.js";
import CustomErrorHandler from "../../services/customErrorHandler.js";

import convertSecondsToDuration from "../../utils/conversion.js";

const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      gender,
      dateOfBirth,
      about = "",
      contactNumber,
      address = "",
    } = req.body;

    const phoneNumberSchema = Joi.string()
      .regex(/^[0-9]{10}$/)
      .message("Invalid phone number !!")
      .required();

    const { error } = phoneNumberSchema.validate(contactNumber);
    if (error) {
      return next(error);
    }

    let userId = req.user.id;
    // console.log({ userId });

    if (!gender || !dateOfBirth || !contactNumber) {
      return next(
        CustomErrorHandler.badRequest("Fill out all the required fields")
      );
    }
    if (!userId) {
      return next(
        CustomErrorHandler.unAuthorized(
          "Unauthorized  Could not find user with this id!"
        )
      );
    }

    // find profile
    const userData = await User.findById(userId);
    const userProfileDetail = await Profile.findById(userData.additionDetails);
    if (!userProfileDetail) {
      return next(CustomErrorHandler.notFound("Profile not found!!"));
    }

    // update the data
    userProfileDetail.dateOfBirth = dateOfBirth;
    userProfileDetail.gender = gender;
    userProfileDetail.contactNumber = contactNumber;
    userProfileDetail.about = about;
    userProfileDetail.address = address;
    userProfileDetail.contactNumber = contactNumber;
    userProfileDetail.save();

    // update name
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name: name,
      },
      { new: true }
    ).populate("additionDetails");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// TODO: deleteAccount -> done
// TODO: getAllUserDetails -> done
// TODO: updateDisplayPicture -> done
// TODO: getEnrolledCourse -> done

const getUserDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId)
      .populate("additionDetails")
      .exec();
    if (!userData) {
      return next(
        CustomErrorHandler.unAuthorized("Invalid user,Logging out !!")
      );
    }
    return res.status(200).json({
      success: true,
      message: "Data fetch successfully",
      data: userData,
    });
  } catch (error) {
    return next(
      CustomErrorHandler.serverError("Error while fetching user data")
    );
  }
};

const updateDisplayPicture = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const displayPicture = req.files.displayPicture || null;
    const userData = await User.findById(userId);
    if (!userData) {
      return next(
        CustomErrorHandler.unAuthorized(
          "Unauthorize! Could not find user with this id"
        )
      );
    }
    if (!displayPicture) {
      return next(CustomErrorHandler.forbidden("Image is required !"));
    }

    const uploadImg = await uploadToCloudinary(displayPicture, CLOUD_FOLDER);
    // console.log(uploadImg);
    const updateProfile = await User.findByIdAndUpdate(
      userId,
      {
        img: uploadImg.secure_url,
      },
      { new: true }
    );
    if (!updateProfile) {
      return next(
        CustomErrorHandler.badRequest("Error while updating profile picture")
      );
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateProfile,
    });
  } catch (error) {
    return next(error);
  }
};

const getEnrolledCourse = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let userData = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!userData) {
      return next(
        CustomErrorHandler.notFound("Not enrolled in any course yet")
      );
    }

    userData = userData.toObject();
    let courseInfo = userData.courses;

    for (const content of courseInfo) {
      let totalDurationInSecond = 0;
      let subsectionLength = 0;
      content.courseContent.forEach((item) => {
        totalDurationInSecond += item.subSection.reduce(
          (acc, curr) => acc + parseFloat(curr.timeDuration),
          0
        );
        subsectionLength += item.subSection.length;
        // console.log(item);
      });
      content.totalDuration = convertSecondsToDuration(totalDurationInSecond);
      // console.log(content);
      let courseProgressCount = await Progress.findOne({
        courseId: content._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos?.length ?? 0;
      if (subsectionLength === 0) {
        content.progressPercentage = 100;
      } else {
        // console.log("1");
        const multiplier = 100;
        content.progressPercentage =
          Math.round(
            (courseProgressCount / subsectionLength) * multiplier * multiplier
          ) / multiplier;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Course fetch successfully",
      data: courseInfo,
    });
  } catch (error) {
    console.log({ error });
    return next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId);

    if (!userData) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    const userProfileId = userData.additionDetails;
    const deleteProfile = await Profile.findByIdAndDelete(userProfileId);
    if (!deleteProfile) {
      return next(
        CustomErrorHandler.forbidden("Could not delete the additional details")
      );
    }

    const deleteUser = await User.findByIdAndDelete(userId);
    const imgUrl = deleteUser.img;
    if (imgUrl.includes("res.cloudinary.com")) {
      const imgName = imgUrl.split("/").slice(-1)[0].split(".")[0];
      const deleteImg = deleteToCloudinary(imgName);
      // console.log("Image delete successfully");
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log({ error });
    return next(error);
  }
};

const instructorDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const courseDetails = await Course.find({ instructor: req.user.id });

    if (!courseDetails) {
      return res.status(200).json({
        success: false,
        message: "Not created any course yet,or do not have enough data",
      });
    }

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({
      success: true,
      message: "Operation successful",
      data: courseData,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export {
  updateProfile,
  getUserDetails,
  updateDisplayPicture,
  getEnrolledCourse,
  deleteAccount,
  instructorDashboard,
};

// shkks7xtgeq2dmjjl8h9
// shkks7xtgeq2dmjjl8h9
