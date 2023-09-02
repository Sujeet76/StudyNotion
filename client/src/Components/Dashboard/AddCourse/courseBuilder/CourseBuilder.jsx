import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { FaAngleRight } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { ButtonDashboard, ReactFormRow } from "../../..";
import { setEdit, setSteps } from "../../../../Slice/course";
import {
  createSection,
  updateSection,
} from "../../../../services/Operation/CourseApi";
import NestedViewSection from "./NestedViewSection";
import CreateSubSection from "./CreateSubSection";

const CourseBuilder = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);

  const [editSubsectionId, setEditSubsectionId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // edit section name
  const handelEditSection = (sectionId, sectionName) => {
    // if user click two time on same edit section -> toggling effect
    if (editSubsectionId === sectionId) {
      setValue("sectionName", "");
      setEditSubsectionId(null);
      return;
    }
    // update section id to editSectionId
    setValue("sectionName", sectionName);
    setEditSubsectionId(sectionId);
  };

  const onSubmit = (data) => {
    const courseId = course?._id;
    // edit section name
    if (editSubsectionId) {
      const sectionId = editSubsectionId;
      dispatch(updateSection(data?.sectionName, sectionId, courseId, token));
      setValue("sectionName", "");
      setEditSubsectionId(null);
      return;
    }

    // create section
    const sectionName = data?.sectionName;
    dispatch(createSection(sectionName, courseId, token));
    setValue("sectionName", "");
  };

  // edit course -> back to course info form
  const editCourseHandler = () => {
    dispatch(setEdit(false));
    dispatch(setSteps(1));
  };

  // cancel edit subsection
  const cancelEdit = () => {
    setEditSubsectionId(null);
    setValue("sectionName", "");
  };

  return (
    <div className="p-6 bg-richblack-800 border border-richblack-700 rounded-lg flex flex-col gap-7">
      <h1 className="text-2xl font-semibold text-richblack-5">
        Course Builder
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactFormRow
          type="text"
          required={true}
          label="Section Name"
          id="sectionName"
          register={register}
          errors={errors}
          error="Section name is required"
          placeholder="Enter section name"
        />

        {/* Add section button */}
        <div className="flex gap-x-4">
          {/* add */}
          <button
            type="submit"
            className="flex items-center border border-yellow-50 bg-transparent gap-x-2 rounded-md py-2 px-5 font-semibold text-yellow-50 mt-6 group"
          >
            <span>
              {editSubsectionId ? "Update a section" : "Create a Section"}
            </span>
            <AiOutlinePlusCircle className="group-hover:scale-125 transition-all duration-200" />
          </button>
          {/* cancel */}
          {editSubsectionId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline self-end"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {/* display section */}
      {/* display subsection nested inside section */}
      {course.courseContent?.length > 0 && (
        <NestedViewSection handelEditSection={handelEditSection} />
      )}

      {/* navigation button */}
      <div className="flex gap-6 self-end">
        <ButtonDashboard
          typeBtn="button"
          className="bg-richblack-300 font-semibold text-richblack-900"
          clickHandler={editCourseHandler}
        >
          Back
        </ButtonDashboard>
        <ButtonDashboard
          typeBtn="submit"
          isActive={true}
          clickHandler={() => dispatch(setSteps(3))}
        >
          Next
          <FaAngleRight />
        </ButtonDashboard>
      </div>
    </div>
  );
};

export default CourseBuilder;
