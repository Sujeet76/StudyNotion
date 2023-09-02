import React, { Children } from "react";

const ReactFormRow = ({
  type,
  required,
  label,
  id,
  register,
  errors,
  error,
  children,
  defaultValue,
  placeholder,
  onKeyDown,
  className,
}) => {
  return (
    <label className="w-full">
      <p className="text-sm font-normal text-richblack-25 relative mb-[6px]">
        {label}
        {required && (
          <sup className="text-pink-200 text-[22px] ml-[2px] absolute top-[40%]">
            *
          </sup>
        )}
      </p>
      <div className="relative">
        <input
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          {...register(id, { required: required })}
          defaultValue={defaultValue}
          className={`w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-richblack-600 ${className}`}
          onKeyDown={onKeyDown}
        />
        {children}
      </div>
      {errors[id] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200 font-medium lowercase">
          {error}
        </span>
      )}
    </label>
  );
};

export default ReactFormRow;
