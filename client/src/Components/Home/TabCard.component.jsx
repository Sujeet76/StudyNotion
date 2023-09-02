import { useState } from "react";
import { Button, HighLightedTextComponent, TabComponent } from "../";
import { homepageExplore } from "../../data";
import { FaArrowRight } from "react-icons/fa";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const tagsData = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const TabCardComponent = () => {
  const [tab, setTab] = useState("Free");
  const [course, setCourse] = useState(homepageExplore[0].courses);
  return (
    <div className="w-11/12 lg:w-full gap-16 lg:mt-[90px] flex flex-col items-center h-[92rem] lg:h-[48rem] relative">
      <div className="text-start lg:text-center">
        <h1 className="text-4xl lg:text-4xl font-semibold my-2">
          Unlock the <HighLightedTextComponent text={"Power of Code"} />
        </h1>
        <p className="font-medium text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>
      <TabComponent
        contentArray={tagsData}
        tab={tab}
        setTab={setTab}
        setCourse={setCourse}
        homepageExplore={homepageExplore}
      />
      <div className="flex flex-col lg:flex-row gap-9 item-center z-10">
        {course.map(({ heading, description, level, lessonNumber }) => (
          <div
            key={`${heading}${description}`}
            className="flex flex-col min-h-[300px] w-[341px] bg-richblack-800 rounded"
          >
            <div className="flex-1 p-6">
              <h2 className="text-lg font-semibold text-richblack-25 ">
                {heading}
              </h2>
              <p className="text-base font-normal text-richblack-500">
                {description}
              </p>
            </div>
            <div className="flex justify-between items-center h-14 border-t-2 border-t-richblack-600 border-dashed px-6">
              <span className="flex items-center gap-2 text-center text-base font-medium text-blue-500">
                <HiUsers className="w-5 h-5" />
                <span>{level}</span>
              </span>
              <span className="flex items-center gap-2 text-center text-base font-medium text-blue-500">
                <ImTree className="w-5 h-5" />
                <span className="mt-1">{lessonNumber}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-img bg-pure-greys-5 h-[320px] w-screen absolute bottom-0 grid place-content-center">
        <div className="flex gap-6 mt-20">
          <Button active={true} linkTo={"/signup"}>
            Explore Full Catalog
            <FaArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
          </Button>
          <Button linkTo={"/login"}>Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default TabCardComponent;
