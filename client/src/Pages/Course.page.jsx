import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BsInfoCircle, BsGlobe2 } from "react-icons/bs";
import { FiGlobe } from "react-icons/fi";

import GetAvgRating from "../utils/avgRating";
import { formatDateAndTime } from "../utils/dateFormatter";

import { courseDetails } from "../services/Operation/CourseApi";

import {
  Loader,
  RatingStars,
  PurchaseCard,
  DropDownMenu,
  SliderComponent,
} from "../Components/";
import { getTotalNumberOfLecture } from "../utils/convertTime";

const CoursePage = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [courseData, setCourseData] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState(Array(0));

  const handelSetActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  useEffect(() => {
    const getData = async () => {
      const data = await courseDetails(courseId, setIsLoading);
      setCourseData(data.result);
      setCourseContent(data?.result?.courseDetail?.courseContent);
      handelSetActive(data?.result?.courseDetail?._id);
    };

    getData();
  }, [location.pathname]);

  useEffect(() => {
    if (courseData) {
      const count = GetAvgRating(courseData?.courseDetail?.ratingAndReview);
      setAvgReviewCount(count);
    }
  }, [courseData]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-3.625rem)] w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (courseData?.result === null) {
    return (
      <div>
        <h1 className="text-4xl text-white ">404 Not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* section 1 */}
      <div className="bg-richblack-800 py-8 ">
        <div className="w-11/12 mx-auto flex gap-12 relative">
          {/* course info */}
          <div className="w-[66%]">
            {/* navbar */}
            <div>
              <span className="text-richblack-300 text-sm  capitalize font-medium">
                Home / Learning /
                <span className="ml-1 text-yellow-50 font-semibold">
                  {courseData?.courseDetail?.category?.categoryName}
                </span>
              </span>
            </div>

            {/* course name */}
            <h1 className="text-3xl text-richblack-5 font-medium mt-3">
              {courseData?.courseDetail?.courseName}
            </h1>

            {/* course details */}
            <p className="text-sm text-richblack-200 mt-3">
              {courseData?.courseDetail?.courseDetails}
            </p>

            {/* review and enrolled student */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-25">
                ({courseData?.courseDetail?.ratingAndReview?.length} rating)
              </span>
              <span className="text-richblack-25">
                {courseData?.courseDetail?.studentEnrolled?.length} students
              </span>
            </div>

            {/* instructor name */}
            <p className="text-richblack-25 mt-3">
              Created by {courseData?.courseDetail?.instructor?.name}
            </p>

            {/* created data and language */}
            <div className="mt-3 text-richblack-25 flex gap-3">
              <p className="flex items-center gap-2">
                <BsInfoCircle className="stroke-[0.5px] h-5 w-5" /> Created at{" "}
                {formatDateAndTime(courseData?.courseDetail?.createdAt)}
              </p>
              <p className="flex items-center gap-2">
                <BsGlobe2 className="h-5 w-5 " /> HinEnglish
              </p>
            </div>
          </div>
          {/* card */}
          <PurchaseCard courseContent={courseData?.courseDetail} />
        </div>
      </div>

      {/* section 2 */}
      <div className="w-11/12 mx-auto my-8 mb-11">
        <div className="w-[66%] mr-auto">
          <div className="p-8 border border-richblack-700">
            <h6 className="text-3xl font-medium text-richblack-5">
              What you'll learn
            </h6>
            <p className="text-sm font-medium mt-3 text-richblack-50">
              {courseData?.courseDetail?.WhatYouLearn}
            </p>
          </div>

          {/* Accordion */}
          <div className="mt-12">
            <div className="mb-4">
              <h4 className="text-2xl font-semibold text-richblack-5">
                Course content
              </h4>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-richblack-50">
                  <span>{courseContent.length} section(s)</span>&nbsp;
                  <span>
                    • {getTotalNumberOfLecture(courseContent)} lecture(s)
                  </span>
                  &nbsp;
                  <span>• {courseData?.totalDuration ?? 0} total length</span>
                </p>
                <button
                  className="text-sm text-yellow-50"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>
            </div>
            <div>
              {courseContent.length > 0 &&
                courseContent?.map((content) => (
                  <DropDownMenu
                    content={content}
                    key={content?._id}
                    isActive={isActive}
                    handelSetActive={handelSetActive}
                  />
                ))}
            </div>
          </div>

          {/* Author */}
          <div className="text-richblack-5 mt-7">
            <h6 className="text-2xl font-semibold">Author</h6>
            <div className="flex items-center gap-3 mt-3">
              <img
                className="w-[3.125rem] h-[3.125] rounded-full"
                src={courseData?.courseDetail?.instructor?.img}
                alt={courseData?.courseDetail?.instructor?.name}
              />
              <span className="font-medium">
                {courseData?.courseDetail?.instructor?.name}
              </span>
            </div>
            <p className="text-sm text-richblack-50 mt-3">
              {courseData?.courseDetail?.instructor?.additionDetails?.about}
            </p>
          </div>
        </div>
      </div>
      <SliderComponent className="mb-14"/>
    </div>
  );
};

export default CoursePage;
