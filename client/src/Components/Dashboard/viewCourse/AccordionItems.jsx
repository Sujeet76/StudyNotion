import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ArrowUpIcon, LectureIcon, PlayIcon } from "../../CoursePage/Icon";

import convertSecondsToDuration from "../../../utils/convertTime";

const AccordionItems = ({
  courseSectionData,
  completedLecture,
  setSubsectionName,
}) => {
  const { courseId, subsectionId, sectionId } = useParams();
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(sectionId);

  useEffect(() => {
    if (setSubsectionName) {
      // console.log(courseSectionData[0]?.subSection[0]?.title);
      setSubsectionName(courseSectionData[0]?.subSection[0]?.title);
    }
  }, [courseSectionData]);

  const onToggle = (id) => {
    if (id === clicked) return setClicked(null);
    setClicked(id);
  };
  const navigateToDifferentRoute = (sectionId, subsectionId, title) => {
    if (setSubsectionName) setSubsectionName(title);

    // console.log("Calling");
    navigate(
      `dashboard/view-video/courseId/${courseId}/section/${sectionId}/subsectionId/${subsectionId}`
    );
  };

  return (
    <ul>
      {/* section name */}
      {courseSectionData.map((content) => (
        <li className="text-sm w-full" key={content?._id}>
          {/* header */}
          <button
            className={`border-b border-b-richblack-600 px-6 py-3 text-richblack-5 font-semibold w-full flex justify-between items-center transition-all duration-200 ${
              clicked === content?._id ? "bg-blue-500" : "bg-richblack-700"
            }`}
            onClick={() => onToggle(content._id)}
          >
            {content?.sectionName}
            <motion.i
              // initial={{ rotate: }}
              animate={{ rotate: clicked === content?._id ? "0deg" : "180deg" }}
              className="rotate-180"
            >
              <ArrowUpIcon className="fill-richblack-400" />
            </motion.i>
          </button>

          {/* body */}
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: clicked === content?._id ? "auto" : 0,
            }}
            // className="overflow-hidden"
            className="overflow-hidden"
          >
            {content.subSection.length > 0 ? (
              <ul className="p-4 py-6 flex flex-col gap-y-3 bg-richblack-900">
                {content?.subSection.map((subsection) => (
                  <li
                    className="flex justify-between group cursor-pointer"
                    key={subsection?._id}
                    onClick={(event) =>
                      navigateToDifferentRoute(
                        content?._id,
                        subsection?._id,
                        subsection?.title
                      )
                    }
                  >
                    <div className="grid grid-cols-[1fr,auto] gap-2">
                      {subsectionId === subsection?._id ? (
                        <PlayIcon className="fill-blue-100 place-self-center" />
                      ) : (
                        <input
                          type="checkbox"
                          disabled
                          checked={completedLecture.includes(subsection?._id)}
                          className="w-5 h-5 place-self-center cursor-not-allowed"
                        />
                      )}
                      <span
                        className={`font-medium group-hover:underline group-hover:text-caribbeangreen-100 group-hover:decoration-caribbeangreen-100 cursor-pointer transition-all duration-200 break-world hyphens-auto ${
                          completedLecture.includes(subsection?._id)
                            ? "line-through text-richblack-400 decoration-richblack-400"
                            : subsectionId === subsection?._id
                            ? "text-blue-100 font-semibold"
                            : "text-richblack-25"
                        }`}
                      >
                        {subsection?.title ?? "section"}
                      </span>
                      {/* <i>
                      <LectureIcon className="fill-richblack-50" />
                    </i> */}
                    </div>
                    <span
                      className={
                        completedLecture.includes(subsection?._id)
                          ? "line-through text-richblack-400 decoration-richblack-400"
                          : subsectionId === subsection?._id
                          ? "text-blue-100 font-semibold"
                          : "text-richblack-25"
                      }
                    >
                      {convertSecondsToDuration(
                        parseInt(subsection?.timeDuration ?? 0)
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-richblack-400 text-base p-4 py-6 font-semibold bg-richblack-900">
                No Lecture
              </div>
            )}
          </motion.div>
        </li>
      ))}
    </ul>
  );
};

export default AccordionItems;
