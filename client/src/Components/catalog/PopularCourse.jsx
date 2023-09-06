import { useState } from "react";
import CourseSlider from "./CourseSlider";

const PopularCourse = ({ selectedCategory }) => {
  const [activeTab, setActiveTab] = useState("mostPopular");

  return (
    <div className="w-11/12 mx-auto mt-14">
      <h1 className="text-3xl font-semibold">Courses to get you started</h1>
      <div className="flex gap-2">
        <button
          className={`${
            activeTab === "mostPopular"
              ? "text-yellow-100 font-medium border-b border-b-yellow-100"
              : "text-richblack-200 font-normal"
          } px-3 py-2`}
          onClick={() => setActiveTab("mostPopular")}
        >
          Most popular
        </button>
        <button
          className={`${
            activeTab === "new"
              ? "text-yellow-100 font-medium border-b border-b-yellow-100"
              : "text-richblack-200 font-normal"
          } px-3 py-2`}
          onClick={() => setActiveTab("new")}
        >
          New
        </button>
      </div>
      <CourseSlider data={selectedCategory?.course} id="popular" />
    </div>
  );
};

export default PopularCourse;
