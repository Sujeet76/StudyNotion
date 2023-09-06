import CourseSlider from "./CourseSlider";

const TopCourses = ({ differentCourse }) => {
  // console.log(mostSellingCourse);
  return (
    <div className="w-11/12 mx-auto mt-14">
      <h1 className="text-3xl font-semibold">
        Top courses in {differentCourse?.categoryName}
      </h1>
      <CourseSlider data={differentCourse?.course} id="top" />
    </div>
  );
};

export default TopCourses;
