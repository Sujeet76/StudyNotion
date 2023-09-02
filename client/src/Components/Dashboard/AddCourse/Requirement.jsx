import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

let i = 1;
const Requirement = ({
  label,
  id,
  required,
  errors,
  register,
  error,
  placeholder,
  setVal,
}) => {
  const [requirements, setRequirements] = useState([]);
  const [requirementData, setRequirementData] = useState("");
  const { edit, course } = useSelector((store) => store.course);

  useEffect(() => {
    if (edit) {
      setRequirements(course?.instructions);
    }
    register(id, { required: required, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    if (course?.instructions) {
      setRequirements(
        course.instructions.map((data, index) => {
          return {
            id: index,
            val: data,
          };
        })
      );
    }
  }, []);


  useEffect(() => {
    setVal(
      id,
      requirements.map((data) => data.val)
    );
  }, [requirements]);

  const removeRequirement = (id) => {
    setRequirements((item) => item.filter((data) => data.id !== id));
  };

  const addRequirement = () => {
    if (requirementData.trim() === "") return;
    let data = {
      id: i++,
      val: requirementData.trim(),
    };

    setRequirements([...requirements, data]);
    setRequirementData("");
  };

  const changeHandler = (e) => {
    setRequirementData(e.target.value);
  };

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
        <textarea
          type="text"
          name={id}
          id={id}
          value={requirementData}
          placeholder={placeholder}
          className="w-full rounded-lg bg-richblack-700 p-3 text-base text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:ring focus:ring-richblack-600"
          onChange={changeHandler}
        ></textarea>
        {errors[id] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {error}
          </span>
        )}
      </label>
      <br />
      <button
        type="button"
        className="font-semibold text-yellow-50 mt-2 ml-2"
        onClick={addRequirement}
      >
        Add
      </button>
      <div
        className={`${requirements.length < 0 ? "hidden" : ""} overflow-hidden`}
      >
        <ul>
          <AnimatePresence initial={false}>
            {requirements.length > 0
              ? requirements.map(({ id, val }, i) => (
                  <motion.li
                    key={i}
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    layout
                  >
                    <div className="flex gap-1 bg-caribbeangreen-800 p-2 rounded-lg mt-2 justify-between">
                      <p className="whitespace-pre-line font-medium">{val}</p>
                      <button
                        type="button"
                        className="self-start justify-self-end px-2 py-1 rounded-lg bg-caribbeangreen-900 font-semibold hover:scale-95 transition-all text-sm"
                        onClick={() => removeRequirement(id)}
                      >
                        Clear
                      </button>
                    </div>
                  </motion.li>
                ))
              : ""}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default Requirement;
