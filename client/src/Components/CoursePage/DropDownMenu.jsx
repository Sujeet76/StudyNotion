import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import convertSecondsToDuration, {
  getTotalDurationPerSection,
} from "../../utils/convertTime";

import { ArrowUpIcon, LectureIcon } from "./Icon";

const DropDownMenu = ({ content, isActive, handelSetActive }) => {
  const accordionItem = useRef(null);
  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setActive(isActive?.includes(content?._id));
  }, [isActive]);

  useEffect(() => {
    setSectionHeight(active ? accordionItem.current?.scrollHeight : 0);
  }, [active]);

  return (
    <div className="border border-richblack-600">
      {/* header */}
      <div
        className="bg-richblack-700 py-4 lg:px-8 sm:px-8 px-6 flex justify-between border-b border-b-richblack-600 gap-2 cursor-pointer"
        onClick={() => handelSetActive(content?._id)}
      >
        <p className="text-richblack-5 font-semibold flex gap-x-2 items-center font-inter">
          <ArrowUpIcon
            className={`fill-richblack-200 ${
              active ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
          />
          <span>{content?.sectionName}</span>
        </p>
        <p className="lg:text-sm md:text-sm text-xs flex items-center gap-3 font-medium">
          <span className="text-yellow-50">
            {content?.subSection?.length ?? 0} lecture(s)
          </span>
          <span className="text-richblack-25">
            {getTotalDurationPerSection(content?.subSection)}
          </span>
        </p>
      </div>
      {/* body */}
      <motion.div
        ref={accordionItem}
        initial={false}
        animate={{ height: sectionHeight }}
        className="overflow-hidden"
      >
        <div className="py-4 px-8 overflow-hidden flex flex-col gap-3">
          {content?.subSection?.length > 0 ? (
            content?.subSection?.map((subsectionData) => (
              <div className="text-sm" key={subsectionData._id}>
                {/* header */}
                <div className="flex items-center justify-between">
                  <p className="text-richblack-5 flex gap-x-2 items-center">
                    <LectureIcon className="fill-richblack-50" />
                    <span className="font-medium">{subsectionData?.title}</span>
                    <ArrowUpIcon className="fill-richblack-200" />
                  </p>
                  <p className="text-richblack-50">
                    {convertSecondsToDuration(subsectionData?.timeDuration)}
                  </p>
                </div>
                {/* body subsection */}
                <div>
                  <p className="px-6 text-richblack-50 mt-1">
                    {subsectionData?.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-richblack-200 font-semibold">No Lecture</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DropDownMenu;
