import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { ButtonDashboard } from "../../";
import { FaAngleRight } from "react-icons/fa";
import { COURSE_STATUS } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourse } from "../../../services/Operation/CourseApi";
import { setSteps } from "../../../Slice/course";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { course } = useSelector((store) => store.course);
  const [loading, setLoading] = useState(false);

  const handelDraft = () => {
    const formData = new FormData();
    const status = COURSE_STATUS.DRAFT;
    formData.append("courseId", course._id);
    formData.append("status", status);
    dispatch(
      editCourse(formData, token, setLoading, navigate, "/dashboard/my-courses")
    );
  };

  const onSubmit = async (data) => {
    const status = data.status ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    const formData = new FormData();
    if (status === COURSE_STATUS.PUBLISHED) {
      formData.append("courseId", course._id);
      formData.append("status", status);
      dispatch(
        editCourse(
          formData,
          token,
          setLoading,
          navigate,
          "/dashboard/my-courses"
        )
      );
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: "-100%",
      }}
      animate={{
        opacity: 1,
        x: "0%",
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        type: "easeInOut",
      }}
    >
      <div className="p-6 rounded-lg border border-richblack-700 bg-richblack-800">
        <h4 className="text-2xl text-richblack-5 font-semibold mb-7">
          Publish Settings
        </h4>
        <div>
          <form id="publish" onSubmit={handleSubmit(onSubmit)}>
            <label
              className="form-control"
              {...register("status", { required: true })}
            >
              <input type="checkbox" name="status" id="status" />

              <span className="font-medium text-richblack-400">
                Make this Course Public
              </span>
            </label>
            {errors["status"] && (
              <span className="ml-2 text-xs tracking-wide text-pink-200 font-medium lowercase">
                Status is required field
              </span>
            )}
          </form>
        </div>
      </div>

      {/* btn container */}
      <div className="flex justify-between gap-2 items-center mt-[5.13rem]">
        <ButtonDashboard clickHandler={() => dispatch(setSteps(2))} className="scale-95">
          <FaAngleRight className="rotate-[180deg]" /> Back
        </ButtonDashboard>
        <div className="flex items-center lg:gap-x-5 gap-3">
          <ButtonDashboard clickHandler={handelDraft}>Draft</ButtonDashboard>
          <ButtonDashboard formId="publish" typeBtn="submit" isActive={true}>
            Publish
          </ButtonDashboard>
        </div>
      </div>
    </motion.div>
  );
};

export default PublishCourse;
