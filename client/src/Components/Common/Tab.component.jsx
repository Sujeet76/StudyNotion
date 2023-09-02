import { motion } from "framer-motion";

const TabComponent = ({
  contentArray,
  tab,
  setTab,
  setCourse,
  homepageExplore,
}) => {
  const clickHandler = (content) => {
    setTab(content);
    if (homepageExplore) {
      const result = homepageExplore.filter((data) => data.tag === content);
      setCourse(result[0].courses);
    }
  };

  return (
    <div className="flex w-11/12 overflow-x-auto gap-5 justify-start lg:justify-center items-center lg:w-max lg:mx-auto bg-richblack-800 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] text-center lg:rounded-full p-1 rounded-lg scroll-bar">
      {contentArray.map((content) => (
        <button
          key={`${content}fdsklfjl`}
          className={`${
            content === tab
              ? "text-richblack-5 font-semibold"
              : "hover:bg-richblack-700 "
          }  text-richblack-200 font-medium text-sm lg:text-[17px] lg:px-7 px-4 py-[7px] lg:rounded-full capitalize  transition-all duration-200 cursor-pointer hover:text-richblack-5 relative focus-visible:outline-2`}
          onClick={() => clickHandler(content)}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {content === tab && (
            <motion.span
              layoutId="bubble"
              className="bg-richblack-900 absolute inset-0 "
              style={{
                borderRadius: "9999px",
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <p className="z-10 relative w-max">{content}</p>
        </button>
      ))}
    </div>
  );
};

export default TabComponent;
