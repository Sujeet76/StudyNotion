import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack, ReSend } from "../../data/Icon.data";
import { useDispatch, useSelector } from "react-redux";
import { reSendOtp, signup } from "../../services/Operation/AuthApi";

const EmailVerificationForm = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const otpInputRefs = Array(6)
    .fill()
    .map((_, index) => useRef());

  const dispatch = useDispatch();
  const { signupData } = useSelector((store) => store.auth);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = value;
        return updatedOtp;
      });

      if (value.length === 1 && index < otpInputRefs.length - 1) {
        otpInputRefs[index + 1].current.focus();
      }
    }
  };
  // auto shift focus to next input
  const handleBackspace = (e, index) => {
    if ((e.key === "Backspace" || e.key === "Delete") && index > 0) {
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = "";
        return updatedOtp;
      });
      otpInputRefs[index - 1].current.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = signupData;
    // console.log(submit);
    let name = firstName.trim();
    let secondName = lastName.trim();
    console.table(signupData);
    dispatch(
      signup(
        name,
        secondName,
        email,
        password,
        confirmPassword,
        accountType,
        otp.join(""),
        navigate
      )
    );
  };

  const resendOpt = () => {
    const { email } = signupData;
    dispatch(reSendOtp(email));
  };

  return (
    <>
      <form onSubmit={submitHandler} className="mt-6">
        <div className="flex lg:gap-5 gap-3 justify-start items-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              aria-label={`Please enter OTP character ${index + 1}`}
              maxLength={1}
              autoComplete="off"
              value={digit}
              placeholder="-"
              style={{
                boxShadow: "rgba(255, 255, 255, 0.18) 0px -1px 0px inset",
              }}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              ref={otpInputRefs[index]}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 bg-yellow-50 text-richblack-900 w-full rounded-lg mx-auto p-3 font-[500] focus:outline-none focus:ring focus:ring-yellow-200 hover:scale-95 transition-all"
        >
          Verify email
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <Link
          to="/login"
          className="flex justify-center items-center text-center text-richblack-5 gap-2 font-[500] hover:text-richblack-100"
        >
          <ArrowBack />
          Back to login
        </Link>
        <button
          type="button"
          className="flex justify-center items-center gap-2 text-blue-100 font-[500] text-center hover:text-blue-200"
          onClick={resendOpt}
        >
          <ReSend />
          Resend it
        </button>
      </div>
    </>
  );
};

export default EmailVerificationForm;
