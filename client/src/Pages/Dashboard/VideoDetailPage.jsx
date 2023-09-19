import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Player, ReviewModal } from "../../Components";

const VideoDetailPage = () => {
  const [reviewModal, setReviewModal] = useState(false);

  const [videoHeight, setVideoHeight] = useState(0);

  console.log(videoHeight);

  return (
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
  );
};

export default VideoDetailPage;
