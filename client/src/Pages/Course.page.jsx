import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { courseDetails } from "../services/Operation/CourseApi";

import { Loader } from "../Components/";

const CoursePage = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setCourseData(await courseDetails(courseId, setIsLoading));
    };
    getData();
  }, [location.pathname]);
  console.log("Co -> -> ", courseData);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-3.625rem)] w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (courseData.result === null) {
    return (
      <div>
        <h1 className="text-4xl text-white ">404 Not found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl text-white"></h1>
    </div>
  );
};

export default CoursePage;
