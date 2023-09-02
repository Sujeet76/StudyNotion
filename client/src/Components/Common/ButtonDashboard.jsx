import React from "react";

const ButtonDashboard = ({
  children,
  typeBtn = "button",
  formId,
  clickHandler = null,
  isActive = false,
  isDisabled = false,
  className,
}) => {
  return (
    <button
      className={`${
        isActive
          ? "bg-yellow-50 text-richblack-900"
          : "bg-richblack-300 border border-richblack-600 text-richblack-900 font-semibold"
      } ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } px-[20px] py-[8px] font-[500]  rounded-lg  flex justify-center items-center gap-2 hover:scale-95 transition-all duration-200 ${className}`}
      style={{
        boxShadow: "-0.5px -1.5px 0px 0px #0000001F inset",
      }}
      onClick={clickHandler}
      type={typeBtn}
      form={formId}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default ButtonDashboard;
