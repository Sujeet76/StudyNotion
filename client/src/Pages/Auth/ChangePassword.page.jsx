import { useState } from "react";
import { FormRowComponent, GenericContainerComponent } from "../../Components";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/Operation/AuthApi";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const collectFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.table([formData]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    const { password, confirmPassword } = formData;
    console.log(formData);
    console.table([password, , confirmPassword, token]);
    console.log("we are here")
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <GenericContainerComponent
      heading={"Choose  new password"}
      subheading={"Almost done. Enter your new password and youre all set."}
    >
      <form onSubmit={submitHandler} className="mt-9">
        <FormRowComponent
          text="New Password"
          type="password"
          name="password"
          value={formData.password}
          handler={collectFormData}
          placeholder={"Enter your password"}
          passwordEyeHandler={setEye1}
          passwordEye={eye1}
        />
        <div className="mt-5">
          <FormRowComponent
            text="Confirm new Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            handler={collectFormData}
            placeholder={"Re-enter your password"}
            passwordEyeHandler={setEye2}
            passwordEye={eye2}
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-yellow-50 text-richblack-900 w-full rounded-lg mx-auto p-3 font-[500] focus:outline-none focus:ring focus:ring-yellow-200 hover:scale-95 transition-all"
        >
          Reset Password
        </button>
      </form>
    </GenericContainerComponent>
  );
};

export default ChangePasswordPage;
