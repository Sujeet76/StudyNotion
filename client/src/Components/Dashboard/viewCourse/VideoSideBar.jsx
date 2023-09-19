import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../";
import { ArrowUpIcon } from "../../CoursePage/Icon";

import AccordionItems from "./AccordionItems";

const VideoSideBar = ({ setReviewModal }) => {
  const {
    courseSectionData,
    completedLecture,
    totalNumberOfLecture,
    courseEntireData,
    isLoading,
  } = useSelector((store) => store.viewCourse);

  const param = useParams();
  const navigate = useNavigate();

  return (
    <aside className="lg:h-[calc(100vh-3.625rem)] h-[calc(100vh-82px)] max-w-[20rem] lg:flex md:flex justify-start bg-richblack-800 border-r-2 border-r-richblack-700  flex-col gap-7 pb-10 overflow-auto hidden">
      <div className="">
        <div className="mt-9">
          {/* name and add review and back button */}
          <div className="px-5 border-richblack-600">
            {/* back button */}
            <button
              className="bg-richblack-600 p-2 rounded-full group shadow-md shadow-richblack-700 hover:shadow-none hover:scale-95 transition-all duration-200 hover:bg-caribbeangreen-600"
              onClick={() => navigate("/dashboard/enrolled-course")}
            >
              <ArrowUpIcon className="fill-richblack-100 -rotate-90 scale-125 group-hover:fill-caribbeangreen-100 transition-all duration-200 group-hover:scale-110" />
            </button>
            {/* review Button */}
            {/* course name */}
            <p className="text-lg text-richblack-25 font-semibold mt-3">
              {courseEntireData?.courseName}&nbsp;
              <span className="text-sm text-caribbeangreen-100 font-medium">
                {completedLecture?.length ?? 0}/{totalNumberOfLecture}
              </span>
            </p>
            <Button
              active={true}
              className="mt-2 scale-90"
              clickHandler={() => setReviewModal(true)}
            >
              Add Review
            </Button>
            <hr className="mt-4 text-richblack-600" />
          </div>
          {/* section data */}
          <div className="w-full mt-6">
            <AccordionItems
              courseSectionData={courseSectionData}
              completedLecture={completedLecture}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default VideoSideBar;
