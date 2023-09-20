import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  RouteThoughClickComponent,
  PopularCourse,
  TopCourses,
  CourseCard,
  Loader,
} from "../Components";

import { getCategoryPageDetails } from "../services/Operation/CourseApi";

const CatalogPage = () => {
  const { categories } = useSelector((store) => store.course);

  const location = useLocation();
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    // console.log("render");
    const option = {
      categories,
      categoryName: location.pathname.split("/").at(-1).replaceAll("-", " "),
      setIsLoading,
    };
    setPageData(await getCategoryPageDetails(option));
  };

  useEffect(() => {
    fetch();
  }, [location.pathname, categories]);

  // console.log(pageData);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-3.625rem)] w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="w-full text-richblack-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* heading */}
        <div className="bg-richblack-800 py-8">
          <div className="w-11/12 mx-auto">
            <RouteThoughClickComponent
              title={pageData?.categoryData?.categoryName}
            />
            <p className="text-sm mt-3 text-richblack-200">
              {pageData?.categoryData?.description}
            </p>
          </div>
        </div>

        {/* section 1 */}
        <PopularCourse
          selectedCategory={pageData?.result?.selectedCategory}
          key="selectedCategory"
        />

        {/* section 2 */}
        <TopCourses
          differentCourse={pageData?.result?.differentCourse}
          key="differentCourse"
        />

        {/* section 3 */}
        <div className="w-11/12 mx-auto mt-14">
          <h1 className="text-3xl font-semibold">Frequently Bought Together</h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-cols-auto  gap-8 mt-10 mb-20">
            {pageData?.result?.mostSellingCourse?.slice(0, 6).map((content) => (
              <CourseCard content={content} key={content._id} />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CatalogPage;
