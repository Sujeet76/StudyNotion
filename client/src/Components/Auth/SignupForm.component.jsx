import { useState } from "react";
import { useDispatch } from "react-redux";

import { FormRowComponent } from "../";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../Slice/auth";
import { sendotp } from "../../services/Operation/AuthApi";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student",
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword_c, setVisiblePassword_c] = useState(false);

  const collectFormDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // TODO : Modify while sending the these fields in less lines
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("sign up data");
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = formData;
    const signupData = { ...formData };
    dispatch(setSignupData(signupData));
    dispatch(
      sendotp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        navigate
      )
    );
    console.table(formData);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="mt-6">
        <div className="flex gap-[5px] bg-richblack-800 form-shadow max-w-max p-1 rounded-full mb-9">
          <button
            type="button"
            className={`rounded-full text-base text-richblack-25 font-[500] px-[20px] py-[8px] hover:bg-richblack-900 ${
              formData.accountType === "Student"
                ? "bg-richblack-900"
                : "bg-transparent"
            }`}
            onClick={() => setFormData({ ...formData, accountType: "Student" })}
          >
            Student
          </button>
          <button
            type="button"
            className={`rounded-full text-base text-richblack-25 font-[500] px-[20px] py-[8px] ${
              formData.accountType === "Instructor"
                ? "bg-richblack-900"
                : "bg-transparent"
            } hover:bg-richblack-900 transition-all duration-200`}
            onClick={() =>
              setFormData({ ...formData, accountType: "Instructor" })
            }
          >
            Instructor
          </button>
        </div>

        {/* actual data */}
        <div className="flex flex-col gap-y-[20px]">
          {/* name */}
          <div className="flex gap-[20px]  justify-center items-center">
            <FormRowComponent
              text={"First Name"}
              type={"text"}
              name={"firstName"}
              value={formData.firstName}
              handler={collectFormDataHandler}
              placeholder={"Enter first name"}
            />
            <FormRowComponent
              text={"lastName"}
              type={"text"}
              name={"lastName"}
              value={formData.lastName}
              handler={collectFormDataHandler}
              placeholder={"Enter last name"}
            />
          </div>

          {/* email */}
          <FormRowComponent
            text={"Email Address"}
            type={"email"}
            name={"email"}
            value={formData.email}
            handler={collectFormDataHandler}
            placeholder={"Enter email address"}
          />

          {/* password */}
          <div className="flex gap-[20px] lg:flex-row md:flex-row flex-col justify-center items-center">
            <FormRowComponent
              text={"Password"}
              type={"password"}
              name={"password"}
              value={formData.password}
              handler={collectFormDataHandler}
              placeholder={"Enter the password"}
              passwordEyeHandler={setVisiblePassword}
              passwordEye={visiblePassword}
            />
            <FormRowComponent
              text={"Confirm Password"}
              type={"password"}
              name={"confirmPassword"}
              value={formData.confirmPassword}
              handler={collectFormDataHandler}
              placeholder={"Enter the password"}
              passwordEyeHandler={setVisiblePassword_c}
              passwordEye={visiblePassword_c}
            />
          </div>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full text-richblack-900 text-base bg-yellow-50 button-shadow font-[500] rounded-lg p-3 mt-16"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
