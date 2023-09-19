import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { HeaderMyCourse, TableCourseInfo } from "../../../Components/";
import { useDispatch, useSelector } from "react-redux";

import { getInstructorCourses } from "../../../services/Operation/CourseApi";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown } from "../../../data/Icon.data";

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  // const
  // console.log(page);
  useEffect(() => {
    console.log("calling me");
    dispatch(
      getInstructorCourses(
        token,
        setIsLoading,
        setCourses,
        page,
        null,
        setPageData
      )
    );
  }, [page]);

  // const handelNavigation = (pageNo) => {
  //   console.log("clicked 1");
  //   if (page >= pageData?.totalPage) return;
  //   navigate({ search: `?page=${pageNo}` });
  //   console.log("clicked 2");
  // };
  const next = () => {
    const data = page + 1;
    if (data > pageData.totalPage) return;
    setPage(data);
    navigate({ search: `?page=${data}` });
  };
  const prev = () => {
    const data = page - 1;
    if (data < 1) return;
    setPage(data);
    navigate({ search: `?page=${data}` });
  };

  const navigateThoughClick =(page) => {
    setPage(page);
    navigate({search:`page=${page}`})
  }

  return (
    <div className="py-10">
      <HeaderMyCourse />
      <TableCourseInfo
        courses={courses}
        isLoading={isLoading}
        setCourses={setCourses}
      />

      {/* pagination */}
      {pageData &&
        (!isLoading ? (
          <div className="w-11/12 mx-auto mt-6 flex justify-center items-center sticky bottom-0">
            <div className="flex text-richblack-25 gap-2 max-w-maxContentTab flex-wrap items-center justify-center">
              {page > 1 && (
                <motion.button
                  className="p-3 rounded-full  bg-richblack-600"
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                >
                  <FaAngleLeft />
                </motion.button>
              )}
              {Array.from({ length: pageData?.totalPage }, (_, index) => {
                return index + 1;
              }).map((pageNo) => (
                <motion.button
                  key={pageNo}
                  className={`px-3 py-1 rounded-lg ${
                    pageNo === page ? "bg-yellow-50 text-richblack-900" : "bg-richblack-600"
                  }`}
                  onClick={()=> navigateThoughClick(pageNo)}
                  whileTap={{ scale: 0.9 }}
                >
                  {pageNo}
                </motion.button>
              ))}
              {page < pageData.totalPage && (
                <motion.button
                  className="p-3 rounded-full  bg-richblack-600"
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                >
                  <FaAngleRight />
                </motion.button>
              )}
            </div>
          </div>
        ) : (
          <></>
        ))}
    </div>
  );
};

export default MyCourse;
