import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { FaXmark } from "react-icons/fa6";

const TagAndChip = ({
  label,
  id,
  required,
  errors,
  register,
  error,
  setVal,
  placeholder,
  defaultValue,
}) => {
  const [tags, setTags] = useState([]);
  const { edit, course } = useSelector((store) => store.course);

  const keyStrokeHandler = (e) => {
    let val;
    if (e.key === "Enter") {
      e.preventDefault();
      val = e.target.value;
      if (val.trim() !== "" && !tags.includes(val.trim())) {
        setTags((prevTags) => [...prevTags, val.trim()]);
      }
      e.target.value = "";
    }
  };
  const removeTag = (tag) => {
    setTags((item) => item.filter((data) => data !== tag));
  };

  useEffect(() => {
    if (edit) {
      setTags(course?.tags);
    }
    register(id, { required: required, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    if (course?.tags && edit) {
      setTags(course?.tags);
    }
  }, []);

  useEffect(() => {
    setVal(id, tags);
  }, [tags]);

  return (
    // upper container
    <div>
      <label htmlFor={id} className="w-full">
        <p className="text-sm font-normal text-richblack-25 relative mb-[6px]">
          {label}
          {required && (
            <sup className="text-pink-200 text-[22px] ml-[2px] absolute top-[40%]">
              *
            </sup>
          )}
        </p>
        <ul
          className={`flex gap-2 ${
            tags.length > 0 ? "my-2" : "m-0"
          }  flex-wrap `}
        >
          <AnimatePresence initial={{ animate: false }}>
            {tags.length > 0
              ? tags.map((tag) => (
                  <motion.li
                    key={tag}
                    initial={{
                      scale: 0,
                      height: 0,
                    }}
                    animate={{ height: "auto", scale: 1 }}
                    exit={{ height: 0, scale: 0 }}
                    layout
                    transition={{
                      height: { duration: 0.2 },
                      scale: { duration: 0.1 },
                    }}
                  >
                    <span className="text-richblack-5 text-sm font-semibold bg-yellow-600 flex gap-1 items-center p-1 px-2 w-max rounded-full">
                      {tag}
                      <FaXmark
                        className="text-richblack-5 text-sm font-semibold cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </span>
                  </motion.li>
                ))
              : ""}
          </AnimatePresence>
        </ul>
        <input
          type="text"
          name={id}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-richblack-600"
          onKeyDown={keyStrokeHandler}
        />
        {errors[id] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200 font-medium lowercase">
            {error}
          </span>
        )}
      </label>
    </div>
  );
};

export default TagAndChip;
