import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PiChart, Loader } from "../../../Components";
import { getInstructorData } from "../../../services/Operation/ProfileApi";
import { getInstructorCourses } from "../../../services/Operation/CourseApi";

const DashboardInstructor = () => {
  const { user } = useSelector((store) => store.profile);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState([]);
  const [instructorCourse, setInstructorCourse] = useState([]);
  const [totalCourse, setTotalCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const statResult = await getInstructorData(token, setIsLoading);
      dispatch(
        getInstructorCourses(
          token,
          setIsLoading,
          setInstructorCourse,
          1,
          setTotalCourse
        )
      );
      console.log(statResult);
      if (statResult?.length > 0) setChartData(statResult);
    })();
  }, []);

  console.log(instructorCourse);

  const totalAmount = chartData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudent = chartData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto py-10">
        <div>
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.name.split(" ")[0]} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-[100px]">
              <Loader />
          </div>
        ) : instructorCourse?.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-4">
              {totalAmount > 0 || totalStudent > 0 ? (
                <PiChart chartData={chartData} />
              ) : (
                <div className="flex-1 rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">
                    Visualize
                  </p>
                  <p className="mt-4 text-xl font-medium text-richblack-50">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
              {/* Total Statistics */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Total Courses</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalCourse}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Students</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalStudent}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Income</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-richblack-800 p-6">
              {/* Render 3 courses */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-richblack-5">
                  Your Courses
                </p>
                <Link to="/dashboard/my-courses">
                  <p className="text-xs font-semibold text-yellow-50">
                    View All
                  </p>
                </Link>
              </div>
              <div className="my-4 flex items-start space-x-6">
                {instructorCourse.slice(0, 3).map((course) => (
                  <div key={course._id} className="w-1/3">
                    <img
                      src={course.content.thumbnail}
                      alt={course.content.courseName}
                      className="h-[201px] w-full rounded-md object-cover"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-richblack-50">
                        {course.content.courseName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-richblack-300">
                          {course.content.studentEnrolled?.length} students
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          |
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          Rs. {course.content.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DashboardInstructor;
