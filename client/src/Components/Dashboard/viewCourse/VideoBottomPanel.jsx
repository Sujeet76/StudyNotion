import uniqid from "uniqid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark, FaAngleDown } from "react-icons/fa6";

import AccordionItems from "./AccordionItems";

const VideoBottomPanel = ({ videoHeight }) => {
  const { courseSectionData, completedLecture } = useSelector(
    (store) => store.viewCourse
  );
  const [viewPanel, setViewPanel] = useState(false);
  const [subsectionName, setSubsectionName] = useState(null);

  const isSmallScreen = () => window.innerWidth < 768;

  return (
    <>
      {isSmallScreen() && (
        <motion.div
          className="lg:hidden left-3 md:hidden block overflow-auto scroll-bar fixed "
          initial={{
            width: "calc(100% - 24px)",
          }}
          animate={{
            width: viewPanel ? "100%" : `calc(100% - 24px)`,
            left: viewPanel ? 0 : 12,
            bottom: viewPanel ? "0px" : ["-50px", "12px"],
            borderRadius: viewPanel ? "10px 10px 0 0" : "12px",
            height: viewPanel ? "352px" : "45px",
            backgroundColor: viewPanel ? "#161D29" : "rgba(0,8,20,0.6)",
          }}
          transition={{
            bottom: {
              type: "spring",
              delay: viewPanel ? 0 : 0.4,
            },
          }}
        >
          <div className="lg:hidden md:hidden block cursor-pointer">
            <motion.div
              className="sticky  backdrop-blur-sm top-0 h-[45px] px-4 flex justify-between items-center font-semibold text-richblack-25"
              animate={{
                backgroundColor: viewPanel ? "#05A77B" : "rgba(6,214,160,0.5)",
              }}
              onClick={() => setViewPanel(true)}
            >
              <p className="max-w-[24ch] truncate ">
                {subsectionName ? subsectionName : "No data"}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewPanel(!viewPanel);
                }}
              >
                {viewPanel ? <FaXmark /> : <FaAngleDown />}
              </button>
            </motion.div>
            <div className="overflow-auto">
              <AccordionItems
                courseSectionData={courseSectionData}
                completedLecture={completedLecture}
                setSubsectionName={setSubsectionName}
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default VideoBottomPanel;
