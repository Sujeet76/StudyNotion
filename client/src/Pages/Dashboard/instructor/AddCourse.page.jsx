import { useDispatch, useSelector } from "react-redux";

import {
  UploadTip,
  ProgressBar,
  CourseInformation,
  CourseBuilder,
  Publish,
} from "../../../Components";
import { useEffect } from "react";
import { setCourse, setEdit, setSteps } from "../../../Slice/course";

const AddCoursePage = () => {
  const { step } = useSelector((store) => store.course);
  return (
    <main className="flex-1 bg-richblack-900 pb-[94px] text-richblack-5">
      <div className="w-11/12 flex gap-6 mx-auto">
        <div className="w-full">
          <ProgressBar />
          {step == 1 && <CourseInformation />}
          {step === 2 && <CourseBuilder />}
          {step === 3 && <Publish />}
        </div>
        <UploadTip />
      </div>
    </main>
  );
};

export default AddCoursePage;
