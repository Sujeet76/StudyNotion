import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormRowComponent } from "../";
import { useDispatch } from "react-redux";

import { login } from "../../services/Operation/AuthApi";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isLoading } = useState((store) => store.auth);

  const [formData, setFormData] = useState(initialState);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const collectFormDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="">
      <form onSubmit={submitHandler} className="mt-6">
        <div className="flex flex-col gap-y-[20px]">
          <FormRowComponent
            text={"Email Address"}
            type={"email"}
            name={"email"}
            value={formData.email}
            handler={collectFormDataHandler}
            placeholder={"Enter email address"}
          />
          <FormRowComponent
            text={"Password"}
            type={"password"}
            name={"password"}
            value={formData.password}
            handler={collectFormDataHandler}
            placeholder={"Enter the password"}
            passwordEyeHandler={setVisiblePassword}
            passwordEye={visiblePassword}
            forget={true}
          />
        </div>
        <button className="w-full text-richblack-900 text-base bg-yellow-50 button-shadow font-[500] rounded-lg p-3 mt-16">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
