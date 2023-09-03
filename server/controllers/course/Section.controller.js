import { Course, Section, SubSection } from "../../models/index.js";
import CustomErrorHandler from "../../services/customErrorHandler.js";

// create section
const createSection = async (req, res, next) => {
  /**
   * flow for creating section
   * fetch all the data from req
   * validate the data
   * create the section
   * fetch course id
   * insert created section into course
   * return res
   */
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return next(CustomErrorHandler.badRequest("Section name and courseId is required!"));
    }

    const courseData = await Course.findById(courseId);
    if (!courseData) {
      return next(
        CustomErrorHandler.badRequest("No course is found with this id")
      );
    }

    const newSection = await Section.create({
      sectionName: sectionName,
    });
    // TODO : populate(section and subsection)
    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully and updated to course",
      data: updateCourse,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// update section
const updateSection = async (req, res, next) => {
  /**
   * flow
   * fetch data from req
   * validate
   * update section using id
   * return res
   */
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionId) {
      return next(CustomErrorHandler.badRequest("Section id is required"));
    }

    const sectionExist = await Section.findById(sectionId);
    if (!sectionExist) {
      return next(CustomErrorHandler.badRequest("Section not found"));
    }

    if (!sectionName) {
      return next(CustomErrorHandler.badRequest("Section name is required!"));
    }

    const updateSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { sectionName: sectionName },
      { new: true }
    ).exec();

    if (!updateSection) {
      return next(CustomErrorHandler.noUpdate("Section could not update"));
    }

    const updateCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updateCourse,
    });
  } catch (error) {
    return next(error);
  }
};

// delete section
const deleteSection = async (req, res, next) => {
  /**
   * flow
   * fetch data from req
   * validate
   * delete section using id
   * return res
   */
  try {
    const { sectionId, courseId } = req.body;
    if (!sectionId || !courseId) {
      return next(
        CustomErrorHandler.badRequest("Section id and course id is required")
      );
    }
    console.log(sectionId, courseId);
    //check course exist
    const course = await Course.findById(courseId);
    if (!course) {
      return next(CustomErrorHandler.notFound("course not found !"));
    }

    // check section exist
    const section = await Section.findById(sectionId);
    if (!section) {
      return next(CustomErrorHandler.notFound("Section not found !"));
    }

    // delete section from course
    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });

    // delete sub-section
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    // TODO : do we need to delete section id from course -> yes
    const updateSection = await Section.findByIdAndDelete({ _id: sectionId });

    // update course
    const updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return next(error);
  }
};

export { createSection, updateSection, deleteSection };
