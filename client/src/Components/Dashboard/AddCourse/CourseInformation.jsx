import { useForm } from "react-hook-form";
import uniqid from "uniqid";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";

import { ButtonDashboard, ReactFormRow, ReactFormTextarea } from "../../";
import TagAndChip from "./TagAndChip";
import { useEffect, useState } from "react";
import {
  createCourse,
  editCourse,
  getCategory,
} from "../../../services/Operation/CourseApi";
import Requirement from "./Requirement";
import { useSelector, useDispatch } from "react-redux";
import Upload from "./uploadFiles";
import { setSteps } from "../../../Slice/course";

const CourseInformation = ({ className }) => {
  const [loading, setLoading] = useState(false);

  const { edit, course, categories } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  console.log(edit);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { category: course?.category?.courseName },
  });

  // course edit
  useEffect(() => {
    if (edit) {
      setValue("title", course?.courseName);
      setValue("description", course?.courseDetails);
      setValue("price", course?.price);
      setValue("tags", course?.tags);
      setValue("benefits", course?.WhatYouLearn);
      setValue("category", course?.category?.categoryName);
      setValue("instructions", course?.instructions);
      setValue("thumbnail", course?.thumbnail);
    }
  }, []);

  // check if course is actually update
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.title !== course?.courseName ||
      currentValues.description !== course?.courseDescription ||
      currentValues.price !== course?.price ||
      currentValues.tags.toString() !== course?.tag.toString() ||
      currentValues.benefits !== course?.whatYouWillLearn ||
      currentValues.category !== course?.category?.categoryName ||
      currentValues.instructions.toString() !==
        course.instructions.toString() ||
      currentValues.thumbnail !== course?.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    console.log(edit);
    if (edit) {
      if (isFormUpdated()) {
        const currentCourse = getValues();
        console.table(currentCourse);
        const formData = new FormData();

        formData.append("courseId", course._id);

        // update only update filed
        if (currentCourse.title !== course.courseName)
          formData.append("courseName", data.title);

        if (currentCourse.description !== course.courseDetails)
          formData.append("courseDetails", data.description);

        if (currentCourse.benefits !== course.WhatYouLearn)
          formData.append("WhatYouLearn", data.benefits);

        if (currentCourse.price !== course.price)
          formData.append("price", parseInt(data.price));

        // Doubt
        if (currentCourse.category !== course?.category?.categoryName)
          formData.append("category_name", data.category);

        if (currentCourse.thumbnail !== course.thumbnail)
          formData.append("thumbnailImage", data.thumbnail);

        if (currentCourse.tags.toString() !== course.tags.toString())
          formData.append("tags", JSON.stringify(data.tags));

        if (
          currentCourse.instructions.toString() !==
          course.instructions.toString()
        ) {
          formData.append("instructions", JSON.stringify(data.instructions));
        }
        dispatch(editCourse(formData, token, setLoading));
        return;
      }
      console.log(data);
    }

    // first time create course
    const formData = new FormData();
    formData.append("courseName", data.title);
    formData.append("courseDetails", data.description);
    formData.append("WhatYouLearn", data.benefits);
    formData.append("price", parseInt(data.price));
    formData.append("category_name", data.category);
    formData.append("thumbnailImage", data.thumbnail);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("instructions", JSON.stringify(data.instructions));
    dispatch(createCourse(formData, token, setLoading));
    console.log(data);
  };

  return (
    <div className={`${className}`}>
      <form
        id="courseInfo"
        className="p-6 bg-richblack-800 border border-richblack-700 rounded-lg flex flex-col gap-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* title course */}
        <ReactFormRow
          type="text"
          label="Course Title"
          id="title"
          required={true}
          errors={errors}
          error="Title is required"
          register={register}
          placeholder="Enter Course Title"
        />

        {/* description */}
        <ReactFormTextarea
          label="Course Short Description"
          id="description"
          required={true}
          errors={errors}
          register={register}
          error="Description is required"
          placeholder="Enter Description"
        />

        {/* price */}
        <ReactFormRow
          type="number"
          label="Price"
          id="price"
          required={true}
          errors={errors}
          register={register}
          error="Price is required"
          placeholder="Price is required"
          className="pl-11"
        >
          <HiOutlineCurrencyRupee className="absolute top-1/2 left-3 -translate-y-1/2 text-2xl text-richblack-400" />
        </ReactFormRow>

        {/* category */}
        <label htmlFor="category" className="w-full relative">
          <p className="text-sm font-normal text-richblack-25 relative mb-[6px]">
            Category
            <sup className="text-pink-200 text-[22px] ml-[2px] absolute top-[40%]">
              *
            </sup>
          </p>
          <select
            id="category"
            name="category"
            {...register("category", {
              required: true,
            })}
            defaultValue={course?.category?.categoryName}
            className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 focus:outline-none focus:ring focus:ring-richblack-600 "
          >
            <option value="" disabled selected>
              Choose a category
            </option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option
                  key={uniqid()}
                  value={category.categoryName}
                  selected={
                    course?.category?.categoryName === category.categoryName
                  }
                >
                  {category.categoryName}
                </option>
              ))}
          </select>
          {errors["category"] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200 font-medium">
              category is required
            </span>
          )}
        </label>

        {/* tag */}
        <TagAndChip
          label="Tag"
          id="tags"
          required={true}
          errors={errors}
          register={register}
          error={"Tag is required"}
          setVal={setValue}
          placeholder={"Press Enter to create tag"}
        />

        <Upload
          label=" Course Thumbnail"
          name="thumbnail"
          register={register}
          errors={errors}
          setVal={setValue}
          editData={edit ? course?.thumbnail : null}
        />

        {/* benefits */}
        <ReactFormTextarea
          label="Benefits of the course"
          id="benefits"
          required={true}
          errors={errors}
          register={register}
          error="Benefits is required"
          placeholder="Enter Benefits of the course"
        />

        {/* requirements */}
        <Requirement
          label="Requirements/Instructions"
          id="instructions"
          required={true}
          errors={errors}
          register={register}
          error="Instruction is required"
          placeholder="Enter Benefits of the course"
          className="h-[48px]"
          setVal={setValue}
        />
      </form>

      <div className="flex gap-4 mt-6 justify-end">
        {edit && (
          <ButtonDashboard clickHandler={() => dispatch(setSteps(2))}>
            Continue Without Saving
          </ButtonDashboard>
        )}

        <ButtonDashboard typeBtn="submit" formId={"courseInfo"} isActive={true}>
          {edit ? "Save Changes" : "Next"}
          <FaAngleRight />
        </ButtonDashboard>
      </div>
    </div>
  );
};

export default CourseInformation;
