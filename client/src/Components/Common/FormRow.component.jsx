import { CloseEye, OpenEye } from "../../data/Icon.data";
import { Link } from "react-router-dom";

const FormRowComponent = ({
  text,
  type,
  name,
  value,
  handler,
  placeholder,
  passwordEyeHandler,
  passwordEye,
  forget = false,
  isRequired = true,
}) => {
  return (
    <label
      htmlFor={name}
      className={`${type === "password" ? "relative" : ""} w-full`}
    >
      <p className="text-sm font-normal text-richblack-25 relative mb-[6px]">
        {text}
        {isRequired && (
          <sup className="text-pink-200 absolute text-[22px] top-[10px] ml-[2px]">
            *
          </sup>
        )}
      </p>
      <input
        type={type === "password" ? (passwordEye ? "text" : "password") : type}
        name={name}
        id={name}
        value={value}
        onChange={handler}
        placeholder={placeholder}
        className={`autofill:bg-richblack-700  w-full h-12 rounded-[8px] p-[0.75rem] text-base text-richblack-25 shadow-form bg-richblack-700 focus:outline-none focus:ring focus:ring-richblack-600 ${
          type === "password" ? "!pr-[48px]" : ""
        }`}
      />
      {type === "password" && (
        <span
          className="absolute right-3 top-[36px] text-richblack-300 z-[10] cursor-pointer"
          onClick={() => passwordEyeHandler(!passwordEye)}
        >
          {!passwordEye ? <OpenEye /> : <CloseEye />}
        </span>
      )}
      {forget && (
        <span className="absolute bottom-[-22px] right-[14px] max-w-max text-xs text-blue-100">
          <Link to="/forget-password">Forget password 🥹 ?</Link>
        </span>
      )}
    </label>
  );
};

export default FormRowComponent;
