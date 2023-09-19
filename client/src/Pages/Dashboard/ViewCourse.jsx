import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark, FaAngleDown } from "react-icons/fa6";

import { VideoSideBar, ReviewModal, VideoBottomPanel } from "../../Components";

import { getStudentCourseDetails } from "../../services/Operation/CourseApi";

const ViewCourse = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const { courseId } = useParams();

  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    (async () => {
      await getStudentCourseDetails(courseId, token, dispatch);
    })();
  }, []);

  return (
    <div className="flex lg:flex-row md:flex-row flex-col  w-full lg:min-h-[calc(100vh-3.625rem)] min-h-[calc(100vh - 82px)]">
      <VideoSideBar setReviewModal={setReviewModal} />
      <div className="lg:h-[calc(100vh-3.625rem)] h-[calc(100vh-82px)] overflow-auto w-full">
        <Outlet />
      </div>

      <VideoBottomPanel />
      <AnimatePresence>
        {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
      </AnimatePresence>
    </div>
  );
};

export default ViewCourse;
