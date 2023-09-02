import { Section, SubSection } from "../../models/index.js";
import uploadToCloudinary, {
  uploadVideoToCloudinary,
} from "../../utils/imageUploader.util.js";
import { CLOUD_FOLDER } from "../../config/index.js";
import CustomErrorHandler from "../../services/customErrorHandler.js";

// create section
const createSubsection = async (req, res, next) => {
  /**
   * flow for creating sub-section
   * fetch all the data from req
   * validate the data
   * create the sub-section
   * fetch section id
   * insert created sub-section into section
   * return res
   */
  try {
    const { title, description, sectionId } = req.body;
    const video = req.files.videoFile;
    if (!title || !sectionId || !description || !video) {
      return next(
        CustomErrorHandler.badRequest("All the felids are required!")
      );
    }

    // check section exit
    if (!(await Section.findById(sectionId))) {
      return next(
        CustomErrorHandler.notFound(
          "No section found corresponding to this section id"
        )
      );
    }

    // upload video-file
    const uploadDetails = await uploadVideoToCloudinary(video);

    // create a subsection
    const newSubsection = await SubSection.create({
      title,
      timeDuration: `${uploadDetails?.duration}`,
      description,
      videoUrl: uploadDetails?.secure_url,
    });

    // TODO : populate(section and subsection) => done
    const updateSubsection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: newSubsection._id } },
      { new: true }
    )
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully and updated to section",
      data: updateSubsection,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// update section
const updateSubsection = async (req, res, next) => {
  /**
   * flow
   * fetch data from req
   * validate
   * update section using id
   * return res
   */
  try {
    const { title, description, subsectionId, sectionId } = req.body;
    const video = req.files?.videoFile;
    if (!subsectionId) {
      return next(
        CustomErrorHandler.badRequest("Subsection id is required !!")
      );
    }
    // check subsection exist
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return next(
        CustomErrorHandler.notFound("No subsection found with this id")
      );
    }

    // update on given field
    if (title) {
      subsection.title = title;
    }

    if (description) {
      subsection.description = description;
    }

    if (video) {
      const uploadDetails = await uploadVideoToCloudinary(video, CLOUD_FOLDER);
      subsection.videoUrl = uploadDetails?.secure_url;
      subsection.timeDuration = uploadDetails?.duration;
    }

    await subsection.save();

    // let updateSubsection;
    // if (!video) {
    //   updateSubsection = await SubSection.findByIdAndUpdate(
    //     subsectionId,
    //     {
    //       $push: data,
    //     },
    //     { new: true }
    //   );
    // } else {
    //   const uploadDetails = await uploadToCloudinary(video, CLOUD_FOLDER);
    //   data.videoUrl = uploadDetails?.secure_url;
    //   data.timeDuration = uploadDetails?.duration;
    //   updateSubsection = await SubSection.findByIdUpdate(
    //     { _id: subsectionId },
    //     {
    //       $push: data,
    //     },
    //     { new: true }
    //   );
    // }

    // update section
    const updatedSection = await Section.findById(sectionId).populate({
      path: "subSection",
      options: { strictPopulate: false },
    });

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// delete section
const deleteSubsection = async (req, res, next) => {
  /**
   * flow
   * fetch data from req
   * validate
   * update section using id
   * return res
   */
  try {
    const { sectionId, subSectionId } = req.body;
    if (!subSectionId || !sectionId) {
      return next(
        CustomErrorHandler.forbidden("section and subsection are required")
      );
    }

    if (!(await SubSection.findById(subSectionId))) {
      return next(CustomErrorHandler.notFound("Subsection not found"));
    }

    if (!(await Section.findById(sectionId))) {
      return next(CustomErrorHandler.notFound("section not found"));
    }

    // TODO : do we need to delete section id from course -> no
    await Section.findByIdAndUpdate(sectionId, {
      $pull: {
        subSection: subSectionId,
      },
    });
    const subSection = await SubSection.findByIdAndDelete(subSectionId);
    if (!subSection) {
      return next(CustomErrorHandler.forbidden("Subsection not deleted!!"));
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    return next(error);
  }
};

export { createSubsection, updateSubsection, deleteSubsection };
