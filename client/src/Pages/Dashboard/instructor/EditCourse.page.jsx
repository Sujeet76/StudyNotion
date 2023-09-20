import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getFullCourseDetails } from "../../../services/Operation/CourseApi";

import {
  Spinner,
  ProgressBar,
  CourseBuilder,
  CourseInformation,
  Publish,
} from "../../../Components";

const EditCoursePage = () => {
  const { courseId } = useParams();
  const { token } = useSelector((store) => store.auth);
  const { step } = useSelector((store) => store.course);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  //fetch course details
  useEffect(() => {
    // console.log("course id ", courseId);
    dispatch(getFullCourseDetails(courseId, token, setIsLoading));
  }, []);

  if (isLoading) {
    return (
      <div className="w-11/12 mx-auto flex justify-center items-center">
        <div>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto flex justify-center items-center pb-10 text-richblack-5">
      {/* <div className="lg:min-w-[40em] mt-9 text-white"> */}
      <div className="">
        <ProgressBar className="lg:w-[42rem]" />
        <div className="lg:w-[42rem]">
          {step == 1 && <CourseInformation />}
          {step === 2 && <CourseBuilder />}
          {step === 3 && <Publish />}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default EditCoursePage;
