import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Loader, RouteThoughClickComponent } from "../../Components";

import { getEnrolledCourses } from "../../services/Operation/ProfileApi";

const headerName = ["Course Name", "Duration", "Progress"];

const EnrolledCoursePage = () => {
  const navigate = useNavigate();

  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const getCourse = async () => {
    const data = await getEnrolledCourses(token, setIsLoading, dispatch);
    setEnrolledCourses(data);
  };

  useEffect(() => {
    getCourse();
  }, []);

  // console.log(enrolledCourses);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-3.625rem)] w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto">
      <RouteThoughClickComponent title="Enrolled Courses" />
      {/* TODO -> tabs */}

      {/* course table */}
      <div className="border border-richblack-700 rounded-lg overflow-hidden mt-12">
        {/* header */}
        <div className="grid grid-cols-6 place-content-center p-4 bg-richblack-700">
          {headerName.map((name, index) => (
            <div key={index} className="first:col-span-3 last:col-span-2">
              <h6 className={`text-sm text-richblack-50 font-medium`}>
                {name}
              </h6>
            </div>
          ))}
        </div>

        {/* body */}
        <div>
          <div className=" flex flex-col">
            {enrolledCourses.map((course) => (
              <Card content={course} key={course._id} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ content, navigate }) => {
  const progressRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState(null);
  // console.log(content);
  const clickHandler = (courseId, sectionId, subsectionId) => {
    navigate(
      `/dashboard/view-video/courseId/${courseId}/section/${sectionId}/subsectionId/${subsectionId}`
    );
  };

  useLayoutEffect(() => {
    setProgressWidth(progressRef.current.offsetWidth);
  }, []);
  return (
    <div className="grid grid-cols-6 gap-3 place-content-center p-4 border-b border-b-richblack-700 last:border-none">
      {/* name and image */}
      <div
        className="flex items-center gap-3 col-span-3 group cursor-pointer"
        onClick={() =>
          clickHandler(
            content._id,
            content.courseContent[0]._id,
            content.courseContent[0].subSection[0]._id
          )
        }
      >
        <img
          src={content?.thumbnail}
          alt={content?.courseName}
          className="w-14 h-14 rounded-xl object-cover self-start"
        />
        <div>
          <p className="font-medium text-richblack-5 group-hover:text-caribbeangreen-100 group-hover:underline group-hover:decoration-caribbeangreen-100 transition-all duration-200">
            {content?.courseName}
          </p>
          <p className="text-sm mt-1 text-richblack-300">
            {content?.courseDetails.substr(0, 40)}...
          </p>
        </div>
      </div>
      {/* duration */}
      <div className="text-richblack-50 text-medium">
        {content?.totalDuration ?? "2hr 30mins"}
      </div>
      {/* progress bar */}
      <div className="w-full col-span-2 flex flex-col justify-center">
        <p className="text-xs font-semibold text-richblack-50 mb-2">
          Progress {content?.progressPercentage}%
        </p>
        <div
          className="relative bg-richblack-700 h-2 rounded-[12.5rem] group"
          ref={progressRef}
        >
          <div
            className="absolute inset-0 bg-blue-100 rounded-[12.5rem] scale-105 group-hover:scale-110 transition-all duration-200"
            style={{
              width: (progressWidth * content?.progressPercentage) / 100,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCoursePage;
