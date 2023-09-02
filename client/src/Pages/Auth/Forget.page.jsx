import { useState } from "react";
import { FormRowComponent, GenericContainerComponent } from "../../Components";
import { useDispatch } from "react-redux";
import { resetPassToken } from "../../services/Operation/AuthApi";

const ForgetPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const changeHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(resetPassToken(email, setSendEmail));
  };

  return (
    <GenericContainerComponent
      heading={sendEmail ? "Check email" : "Reset your password"}
      subheading={
        sendEmail
          ? `We have sent the reset email to ${email}`
          : "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
      }
    >
      <form onSubmit={submitHandler} className="mt-9">
        {!sendEmail && (
          <FormRowComponent
            text={"Email Address"}
            type={"email"}
            name={"email"}
            value={email}
            handler={changeHandler}
            placeholder={"Enter your email address"}
          />
        )}
        <button
          type="submit"
          className="mt-6 bg-yellow-50 text-richblack-900 w-full rounded-lg mx-auto p-3 font-[500] focus:outline-none focus:ring focus:ring-yellow-200 hover:scale-95 transition-all"
        >
          {sendEmail ? "Resend Email" : "Reset Password"}
        </button>
      </form>
    </GenericContainerComponent>
  );
};

export default ForgetPage;
