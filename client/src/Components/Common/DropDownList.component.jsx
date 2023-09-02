import { Link } from "react-router-dom";

import { FaChevronDown } from "react-icons/fa";

const DropDownList = ({ categoryList, title }) => {
  return (
    <li className="px-3 py-1 text-base group hover:font-semibold text-richblack-25 relative">
      <div className="flex justify-center items-center gap-[6px] transition-all duration-200">
        {title}{" "}
        <FaChevronDown className="font-normal group-hove:font-semibold group-hover:rotate-180 transition-all duration-200" />
      </div>
      <div className="invisible absolute left-[46.5%] z-[1000] min-w-[14rem] translate-x-[-50%] translate-y-[3em] rounded-[6px] bg-richblack-800  pt-4 text-richblack-50 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 border border-richblack-700">
        <div className="absolute left-[50%] top-0 -z-11 h-6 w-6 translate-x-[-50%] translate-y-[-50%] rotate-45 select-none rounded bg-richblack-800 border border-l-richblack-700 border-t-richblack-700 border-b-richblack-800 border-r-richblack-800" />
        {categoryList.length <= 0 ? (
          <div className=" bg-transparent text-center py-3 px-2 border-b-richblack-700 border-b last:border-none select-none">
            No category found 😶‍🌫️
          </div>
        ) : (
          categoryList.map((links) => (
            <Link
              to={`/catalog/${links?.categoryName.replaceAll(" ", "-")}`}
              key={links?._id}
              className="flex justify-center items-center w-full rounded bg-transparent py-3 px-2 hover:bg-richblack-900 border-b-richblack-700 border-b last:border-none transition-all duration-150"
            >
              {links.categoryName}
            </Link>
          ))
        )}
      </div>
    </li>
  );
};

export default DropDownList;
