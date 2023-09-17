import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Button = ({
  children,
  active = false,
  linkTo,
  isNormal,
  clickHandler,
  className,
}) => {
  return (
    <Link to={linkTo}>
      <button
        className={`group ${
          isNormal
            ? "bg-richblack-800 border border-richblack-700 text-richblack-25 hover:text-richblack-5 py-[5px] px-3"
            : active
            ? "bg-yellow-50 text-richblack-800 shadow-[2px_2px_0px_0px_#FFF970] py-3 px-4 lg:px-6"
            : "text-richblack-5 bg-richblack-800 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] py-3 px-6"
        } text-center lg:text-base   font-inter  rounded-lg hover:shadow-none hover:scale-95 hover:font-semibold transition-all duration-200 ${className}`}
        onClick={clickHandler}
      >
        <span className="flex gap-2 items-center text-[13px] justify-center lg:text-base font-inter font-semibold">
          {children}
        </span>
        {/* {children} */}
      </button>
    </Link>
  );
};

export default Button;
