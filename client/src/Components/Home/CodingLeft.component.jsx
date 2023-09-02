import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Common/Button";

const CodingLeftComponent = ({ heading, subheading, btn1, btn2 }) => {
  return (
    <div className="lg:w-[33rem] self-start">
      {heading}
      <p className="text-richblack-300 text-base font-[500] font-inter mt-[12px] ">
        {subheading}
      </p>
      <div className="flex gap-6 mt-[3.25rem]">
        <Button active={btn1.active} linkTo={btn1.linkTo}>
          {btn1.children + " "}
          <FaArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
        </Button>
        <Button active={btn2.active} linkTo={btn2.linkTo}>
          {btn2.children}
        </Button>
      </div>
    </div>
  );
};

export default CodingLeftComponent;
