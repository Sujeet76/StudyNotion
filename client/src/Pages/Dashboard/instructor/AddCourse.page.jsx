import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { FaAngleLeft } from "react-icons/fa";

import {
  UploadTip,
  ProgressBar,
  CourseInformation,
  CourseBuilder,
  Publish,
} from "../../../Components";
import { useEffect, useState } from "react";
import { setCourse, setEdit, setSteps } from "../../../Slice/course";
import { useNavigate } from "react-router-dom";

const AddCoursePage = () => {
  const { step } = useSelector((store) => store.course);

  const navigate = useNavigate();
  return (
    <main className="flex-1 bg-richblack-900 pb-[94px] text-richblack-5">
      {/* back button */}
      <div className="mt-6 w-11/12 mx-auto">
        <button
          className="text-richblack-300 text-sm flex justify-center items-center gap-1 mb-3"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft />
          Back to Dashboard
        </button>
      </div>
      <div className="w-11/12 flex lg:flex-row md:flex-row flex-col-reverse gap-6 mx-auto">
        {/* form */}
        <div className="w-full">
          <ProgressBar />
          <AnimatePresence>
            {step == 1 && <CourseInformation />}
            {step === 2 && <CourseBuilder />}
            {step === 3 && <Publish />}
          </AnimatePresence>
        </div>
        {/* tips */}
        <UploadTip />
      </div>
    </main>
  );
};

export default AddCoursePage;
