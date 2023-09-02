import LoginForm from "./LoginForm.component";
import SignupForm from "./SignupForm.component";

import bg_img from "../../assets/auth-bg-img.svg";

const AuthTemplateComponent = ({
  heading,
  subheading,
  sub_subheading,
  fromType,
  image,
}) => {
  return (
    <div className="flex w-11/12 gap-[5rem] justify-center  mt-[66px] mx-auto">
      <div className="w-[532px]  p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-richblack-25 font-semibold text-3xl w-[90%]">
            {heading}
          </h1>
          <p className="text-lg text-richblack-100 font-normal font-inter w-[105%]">
            {subheading}{" "}
            <span className="text-blue-100 font-[700] font-edu-sa">
              {sub_subheading}
            </span>
          </p>
        </div>
        {fromType === "login" ? <LoginForm /> : <SignupForm />}
      </div>
      <div className="relative">
        <img
          className="max-w-[558px] max-h-[504px] object-cover relative z-10"
          src={image}
          alt={"foreground image"}
        />
        <img
          className="max-w-[558px] max-h-[504px] object-cover absolute top-4 left-4"
          src={bg_img}
          alt={"bg image"}
        />
      </div>
    </div>
  );
};

export default AuthTemplateComponent;
