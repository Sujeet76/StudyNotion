import { CLOUD_FOLDER } from "../../config/index.js";

import {
  Category,
  User,
  Course,
  Section,
  SubSection,
} from "../../models/index.js";

import uploadToCloudinary from "../../utils/imageUploader.util.js";

import CustomErrorHandler from "../../services/customErrorHandler.js";
import convertSecondsToDuration from "../../utils/conversion.js";

// create course
const createCourse = async (req, res, next) => {
  /**
   * flow how it work
   * => fetch data from req body and req filed(images)
   * =>validate the fields
   * =>check Category is valid
   * =>bring id of instructor from db
   * =>Insert course id into Category document
   * => upload thumbnail image to cloudInary
   * =>create entry for course document
   * =>insert course document
   * =>return response
   */
  try {
    const {
      courseName,
      courseDetails,
      WhatYouLearn,
      price,
      category_name,
      tags,
      instructions,
    } = req.body;
    let { status } = req.body;

    const thumbnail = req.files.thumbnailImage;
    const userId = req.user.id;
    // validate data fields
    console.log(
      courseName,
      courseDetails,
      WhatYouLearn,
      price,
      category_name,
      tags,
      status,
      instructions
    );
    console.log(req.files.thumbnailImage);
    if (
      !courseName ||
      !courseDetails ||
      !WhatYouLearn ||
      !price ||
      !category_name ||
      !tags ||
      !instructions
    ) {
      return next(CustomErrorHandler.badRequest("All the field are required!"));
    }
    if (!thumbnail) {
      return next(CustomErrorHandler.badRequest("Thumbnail is required"));
    }
    const tagArray = JSON.parse(tags);
    const instructionArray = JSON.parse(instructions);
    if (!status || status === undefined) {
      status = "Draft";
    }

    // check valid instructor
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return next(CustomErrorHandler.unAuthorized("Instructor not found"));
    }

    // fetching Category and validating it
    const categoryData = await Category.findOne({
      categoryName: category_name,
    });

    if (!categoryData) {
      return next(
        CustomErrorHandler.forbidden("category not found please try later")
      );
    }

    console.log(categoryData);

    // upload to cloudInary
    const thumbnailImage = await uploadToCloudinary(thumbnail, CLOUD_FOLDER);

    // creating entry for course document
    const newCourse = await Course.create({
      courseName,
      courseDetails,
      instructor: instructorDetails._id,
      WhatYouLearn,
      price,
      thumbnail: thumbnailImage.secure_url,
      category: categoryData._id,
      tags: tagArray,
      status,
      instructions: instructionArray,
    });
    // update course to instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );
    // update the Category schema
    await Category.findByIdAndUpdate(
      { _id: categoryData._id },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log({ error });
    return next(error);
  }
};

// get course
const getAllCourseDetails = async (req, res, next) => {
  try {
    const allCourse = await Course.find(
      { status: "Publish" },
      {
        courseName: true,
        courseDetails: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    if (!allCourse) {
      return next(CustomErrorHandler.notFound("No course found!!"));
    }

    res.status(200).json({
      success: true,
      message: "course fetch successfully",
      data: allCourse,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// get a  course details
const getCourseDetail = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      console.log(courseId);
      return next(CustomErrorHandler.forbidden("CourseId is required!!"));
    }

    console.table(courseId);
    const courseDetail = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionDetails",
        },
      })
      .populate({ path: "category" })
      .populate({ path: "ratingAndReview" })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec();

    if (!courseDetail) {
      return next(CustomErrorHandler.notFound("Course not found !!"));
    }

    // console.log(courseDetail);

    let totalCourseDurations = 0;
    courseDetail.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeInSecond = parseInt(subSection.timeDuration);
        totalCourseDurations += timeInSecond;
      });
    });

    const totalDuration = convertSecondsToDuration(totalCourseDurations);

    return res.status(200).json({
      success: true,
      message: `Data fetch successful`,
      data: { courseDetail, totalDuration },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return next(CustomErrorHandler.badRequest("Course not found!!"));
    }

    if (req.files) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadToCloudinary(thumbnail, CLOUD_FOLDER);
      course.thumbnail = thumbnailImage.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        console.log(key);
        if (key === "tags" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
          console.log(course[key], updates[key]);
        } else {
          course[key] = updates[key];
          console.log(course[key], updates[key]);
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        select: "-password",
        populate: {
          path: "additionDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return next(error);
  }
};

// deleteCourse
const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const courseExist = await Course.findById(courseId);
    if (!courseExist) {
      return next(CustomErrorHandler.notFound("Course not found"));
    }

    // unroll the student from course
    const studentEnrolled = courseExist.studentEnrolled;
    for (const studentId of studentEnrolled) {
      console.log(studentId);
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // delete course from instructor schema
    await User.findByIdAndUpdate(courseExist.instructor, {
      $pull: { courses: courseId },
    });

    // pull the entry of course from category schema
    await Category.findByIdAndUpdate(courseExist.category, {
      $pull: { course: courseId },
    });

    // delete section and subsection
    const courseSection = courseExist.courseContent;
    for (const sectionId of courseSection) {
      // delete subsection -> it exits
      const section = await Section.findById(sectionId);
      if (section) {
        // delete subsection
        const subsection = section.subSection;
        for (const subsectionId of subsection) {
          await SubSection.findByIdAndDelete(subsectionId);
        }
      }
      // delete section
      await Section.findByIdAndDelete(sectionId);
    }

    // delete course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// get instructor course
const getInstructorCourse = async (req, res, next) => {
  try {
    const instructor = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    if (!instructor) {
      return next(CustomErrorHandler.badRequest("All the fields are required"));
    }
    const userExistAndValid = await User.findById(instructor);
    if (!userExistAndValid) {
      return next(CustomErrorHandler.unAuthorized("Invalid user"));
    }

    const instructorCourseCount = await Course.countDocuments({
      instructor: instructor,
    });

    const instructorCourse = await Course.find({
      instructor: instructor,
    })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .select("-ratingAndReview -studentEnrolled -__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (!instructorCourse) {
      return next(CustomErrorHandler.notFound("Course not found !!"));
    }

    let result = [];
    instructorCourse.forEach((data) => {
      let totalCourseDuration = 0;
      data.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeInSecond = parseInt(subSection.timeDuration);
          totalCourseDuration += timeInSecond;
        });
      });
      totalCourseDuration = convertSecondsToDuration(totalCourseDuration);
      let temp = {};
      temp.content = data;
      temp.content.courseContent = undefined;
      temp.duration = totalCourseDuration;
      result.push(temp);
    });

    return res.status(200).json({
      success: true,
      message: `Data fetch successful`,
      data: result,
      currentPage: page,
      totalPages: Math.ceil(instructorCourseCount / perPage),
    });
  } catch (error) {
    return next(error);
  }
};

export {
  createCourse,
  getCourseDetail,
  getAllCourseDetails,
  deleteCourse,
  updateCourse,
  getInstructorCourse,
};
