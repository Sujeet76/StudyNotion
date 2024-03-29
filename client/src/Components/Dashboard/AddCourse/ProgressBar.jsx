import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import { useSelector } from "react-redux";

import { AnimatePresence, motion } from "framer-motion";

const tabs = [
  {
    id: 1,
    label: "Course Information",
  },
  {
    id: 2,
    label: "Course Builder",
  },
  {
    id: 3,
    label: "Publish",
  },
];

const ProgressBar = ({ className }) => {
  const navigate = useNavigate();
  const { step } = useSelector((store) => store.course);

  return (
    <>
      {/* steps bar */}
      <header className={`relative overflow-hidden mt-9 mb-16 ${className}`}>
        <div className="flex justify-between relative overflow-hidden">
          <div className="border-t-2 border-dashed w-[calc(100%-100px)] border-richblack-600 absolute top-[30%] mx-auto left-[70px]" />
          {tabs.map(({ id, label }) => (
            <Step step={id} currentStep={step} label={label} key={id} />
          ))}
        </div>
      </header>
    </>
  );
};

const Step = ({ step, currentStep, label }) => {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <div className="flex flex-col items-center relative">
      <motion.div
        className="w-[38px] h-[38px] rounded-full text-richblack-300 text-center font-lg  border  flex justify-center items-center"
        animate={status}
        variants={backgroundVariants}
        transition={backgroundTransition}
      >
        <AnimatePresence>
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6 text-richblack-900" />
          ) : (
            <motion.span key="step" animate={{ opacity: 1 }}>
              {step}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <p
        className={` ${
          status === "active"
            ? "text-richblack-25"
            : status === "inactive"
            ? "text-richblack-500"
            : "text-richblack-300"
        } text-sm  mt-2`}
      >
        {label}
      </p>
    </div>
  );
};

const CheckIcon = (props) => {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        strokeLinecap="round"
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

export default ProgressBar;

let backgroundTransition = { duration: 0.2 };
let backgroundVariants = {
  inactive: {
    background: "#161D29",
    borderColor: "#2C333F",
    color: "#838894",
  },
  active: {
    background: "#251400",
    borderColor: "#FFD60A",
    color: "#FFD60A",
  },
  complete: {
    background: "#FFD60A",
    borderColor: "#FFD60A",
  },
};
let checkIconTransition = {
  ease: "easeOut",
  type: "tween",
};
let checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};
