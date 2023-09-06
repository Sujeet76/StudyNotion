import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useNavigate } from "react-router-dom";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardCourse from "./CardCourse";
import { Spinner, ButtonDashboard, ConfirmationModal } from "../../";

import {
  EditIcon,
  DeleteIcon,
  PlusIcon,
} from "../AddCourse/courseBuilder/Icon";

import {
  deleteCourse,
  getInstructorCourses,
} from "../../../services/Operation/CourseApi";

import { setCourse, setEdit } from "../../../Slice/course";

const TableCourseInfo = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const { token } = useSelector((store) => store.auth);
  // const { course } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (isLoading && courses.length === 0) {
    console.log("inside");
    dispatch(getInstructorCourses(token, setIsLoading, setCourses));
    // }
  }, []);
  // useEffect(() => {
  //   // if (courses.length === 0) {
  //   dispatch(getInstructorCourses(token, setIsLoading, setCourses));
  //   // }
  // }, []);

  // console.log(courses);

  const handelDelete = (courseId) => {
    dispatch(deleteCourse(courseId, token, setCourses, courses,setConfirmationModal));
  };

  const editHandler = (courseId) => {
    navigate(`/dashboard/edit-course/${courseId}`);
  };

  return (
    <div className="w-[90%] mx-auto border-2 border-richblack-800 rounded-lg mt-9 pb-6">
      <Table className="">
        <Thead>
          <Tr className="font-medium text-richblack-100 border-b border-b-richblack-800 flex gap-x-10  px-6 py-2">
            <Th className="flex-1 text-start">Course</Th>
            <Th className="text-start">Duration</Th>
            <Th className="text-start">Price</Th>
            <Th className="text-start">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            // loader
            <Tr>
              <Td className="flex justify-center items-center py-6">
                <Spinner />
              </Td>
            </Tr>
          ) : courses?.length === 0 ? (
            // course not found
            <Tr>
              <Td className="text-richblack-50 text-center p-2">
                <span className="text-2xl">No course Found!</span>
                <ButtonDashboard
                  isActive={true}
                  className="mx-auto mt-4"
                  clickHandler={() => navigate("/dashboard/add-course")}
                >
                  <PlusIcon />
                  Create a Course
                </ButtonDashboard>
              </Td>
            </Tr>
          ) : (
            // course display
            courses.map(({ content, duration }) => (
              <Tr key={content._id} className="flex gap-x-10 px-6 py-8 pb-0">
                {/* card */}
                <Td className="flex-1 gap-x-4">
                  <CardCourse
                    img={content.thumbnail}
                    title={content.courseName}
                    description={content.courseDetails}
                    date={content.createdAt}
                    status={content.status}
                  />
                </Td>

                {/* duration */}
                <Td className="text-sm text-richblack-100 font-medium">
                  {duration}
                </Td>

                {/* price */}
                <Td className="text-sm text-richblack-100 font-medium">
                  ₹{content.price}
                </Td>

                {/* action */}
                <Td className="flex gap-2 items-start ">
                  {/* edit */}
                  <button
                    className=" group transition-all duration-200 hover:scale-110"
                    onClick={() => editHandler(content._id)}
                  >
                    <EditIcon className="fill-richblack-400 group-hover:fill-caribbeangreen-300 transition-all duration-200" />
                  </button>
                  {/* delete */}
                  <button
                    className=" group transition-all duration-200 hover:scale-110"
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handelDelete(content._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <DeleteIcon className="fill-richblack-400 group-hover:fill-pink-300 transition-all duration-200" />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default TableCourseInfo;
