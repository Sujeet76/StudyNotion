import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import { Player, ReviewModal, Loader } from "../../Components";

const VideoDetailPage = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { isLoading } = useSelector((store) => store.viewCourse);

  const [videoHeight, setVideoHeight] = useState(0);

  // console.log(videoHeight);

  return (
    <>
      {isLoading ? (
        <div className="lg:min-h-[calc(100vh-3.625rem)] h-[calc(100vh-82px)]  w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <Player
              setReviewModal={setReviewModal}
              setVideoHeight={setVideoHeight}
            />
          </div>
          <AnimatePresence>
            {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default VideoDetailPage;
