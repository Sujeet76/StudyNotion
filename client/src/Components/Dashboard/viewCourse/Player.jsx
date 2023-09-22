import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Player as VideoPlayer,
  ControlBar,
  ReplayControl,
  ForwardControl,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton,
} from "video-react";
import "video-react/dist/video-react.css"; // import css

import { Button, ButtonDashboard } from "../../";

import { updateCourseProgress } from "../../../services/Operation/CourseApi";
import { formattedDate } from "../../../utils/dateFormatter";

const Player = ({ setReviewModal, setVideoHeight }) => {
  const dispatch = useDispatch();

  const video = useRef(null);

  const { courseSectionData, courseEntireData } = useSelector(
    (store) => store.viewCourse
  );
  const { token } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoEnd, setIsVideoEnd] = useState(false);

  const { courseId, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef) {
      setVideoHeight(
        videoRef.current?.offsetHeight + videoRef.current?.offsetTop
      );
    }
    // console.log(videoRef);
  }, [videoRef]);

  // setFirstVideo
  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;

      const selectedVideoSection = courseSectionData.filter(
        (content) => content._id == sectionId
      );
      const selectedVideoUrlSubsection =
        selectedVideoSection[0].subSection.filter(
          (content) => content._id === subsectionId
        );
      setCurrentVideo(selectedVideoUrlSubsection[0]);
      setIsVideoEnd(false);
    })();
  }, [location.pathname, courseEntireData, courseSectionData]);

  const filterAndIndex = () => {
    const sectionIndex = courseSectionData.findIndex(
      (content) => content._id === sectionId
    );
    const indexOfCurrentVideo = courseSectionData[
      sectionIndex
    ].subSection.findIndex((content) => content._id === subsectionId);

    return {
      sectionIndex: sectionIndex,
      subsectionIndex: indexOfCurrentVideo,
    };
  };

  const isFirstVideo = () => {
    const index = filterAndIndex();

    if (index.sectionIndex === 0 && index.subsectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const index = filterAndIndex();

    let lastIndex = courseSectionData?.length - 1;
    if (
      index.sectionIndex === lastIndex &&
      index.subsectionIndex ===
        courseSectionData[lastIndex].subSection.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const index = filterAndIndex();
    const currentSubsectionLength =
      courseSectionData[index.sectionIndex].subSection.length;

    if (index.subsectionIndex !== currentSubsectionLength - 1) {
      // if in same section -> next video
      const nextSubsection =
        courseSectionData[index.sectionIndex].subSection[
          index.subsectionIndex + 1
        ]._id;
      navigate(
        `/dashboard/view-video/courseId/${courseId}/section/${sectionId}/subsectionId/${nextSubsection}`
      );
    } else {
      // last video of that section -> next section , first video
      const nextSection = courseSectionData[index.sectionIndex + 1]._id;
      const nextSubsection =
        courseSectionData[index.sectionIndex + 1].subSection[0]._id;
      navigate(
        `/dashboard/view-video/courseId/${courseId}/section/${nextSection}/subsectionId/${nextSubsection}`
      );
    }
  };

  const goToPrevVideo = () => {
    const index = filterAndIndex();

    if (index.subsectionIndex !== 0) {
      // if in same section -> prev video

      const nextSubsection =
        courseSectionData[index.sectionIndex].subSection[
          index.subsectionIndex - 1
        ]._id;
      navigate(
        `/dashboard/view-video/courseId/${courseId}/section/${sectionId}/subsectionId/${nextSubsection}`
      );
    } else {
      // fist video of that section -> prev section , last video
      const prevSection = courseSectionData[index.sectionIndex - 1];

      const nextSection = prevSection._id;
      const nextSubsection =
        prevSection.subSection[prevSection.subSection.length - 1]._id;
      navigate(
        `/dashboard/view-video/courseId/${courseId}/section/${nextSection}/subsectionId/${nextSubsection}`
      );
    }
  };
  const handelMarkAsComplete = async () => {
    setIsVideoEnd(true);
    await updateCourseProgress(token, courseId, subsectionId, dispatch);
  };

  return (
    <div className="lg:px-4 md:px-4 pb-9 lg:pb-9">
      {currentVideo ? (
        <div
          className="w-full lg:rounded-2xl lg:relative md:relative sticky top-0 md:rounded-2xl overflow-hidden shadow-md  shadow-richblack-800 lg:mt-4 md:mt-4"
          ref={videoRef}
        >
          <VideoPlayer
            src={currentVideo.videoUrl}
            aspectRatio="16:9"
            playsInline={true}
            poster={courseEntireData.thumbnail}
            ref={playerRef}
            onEnded={handelMarkAsComplete}
          >
            <BigPlayButton position="center" />
            <ControlBar autoHide={true}>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <PlaybackRateMenuButton
                rates={[2, 1.75, 1.5, 1.25, 1, 0.5, 0.25]}
                order={7.1}
              />
              <VolumeMenuButton />
            </ControlBar>
            <AnimatePresence>
              {isVideoEnd && (
                <motion.div
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                  className="full absolute inset-0 z-[100] flex h-full items-center justify-center gap-6 font-inter flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    clickHandler={() => {
                      if (playerRef) {
                        playerRef.current.seek(0);
                        playerRef.current.play();
                        setIsVideoEnd(false);
                      }
                    }}
                  >
                    Re-Watch
                  </Button>
                  <div className="flex gap-6">
                    {!isFirstVideo() && (
                      <ButtonDashboard
                        className="text-base"
                        clickHandler={goToPrevVideo}
                      >
                        Prev
                      </ButtonDashboard>
                    )}
                    {!isLastVideo() && (
                      <ButtonDashboard
                        className="text-base"
                        isActive={true}
                        clickHandler={goToNextVideo}
                      >
                        Next
                      </ButtonDashboard>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </VideoPlayer>
        </div>
      ) : (
        <div className="w-full rounded-xl overflow-hidden shadow-md  shadow-richblack-800">
          No video data to display
        </div>
      )}

      <div className="mt-6 pl-2">
        {/* review button */}
        <Button
          active={true}
          className="my-4"
          clickHandler={() => setReviewModal(true)}
        >
          Add Review
        </Button>

        <p className="text-sm font-bold text-richblack-200">Lecture Name : </p>
        <h1 className="text-2xl font-semibold text-richblack-25">
          {currentVideo?.title}
        </h1>
        <p className="text-sm font-bold text-richblack-200 mt-3">
          Lecture description :{" "}
        </p>
        <p className="text-richblack-50">{currentVideo?.description}</p>

        <p className="text-sm text-richblack-25 mt-2 font-medium flex gap-2">
          <span>Created by</span>
          <span className="italic underline">
            {courseEntireData?.instructor?.name}
          </span>
          <span>|</span>
          {formattedDate(parseInt(courseEntireData.createdAt))}
        </p>
      </div>
    </div>
  );
};

export default Player;
