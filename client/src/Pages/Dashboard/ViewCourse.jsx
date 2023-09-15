import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { VideoSideBar, ReviewModal } from "../../Components";

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
    <div className="flex  w-full min-h-[calc(100vh-3.625rem)]">
      <VideoSideBar setReviewModal={setReviewModal} />
      <div className="h-[calc(100vh-3.625rem)] overflow-auto w-full">
        <Outlet />
      </div>
      <AnimatePresence>
        {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
      </AnimatePresence>
    </div>
  );
};

export default ViewCourse;
