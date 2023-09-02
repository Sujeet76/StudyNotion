import { AuthTemplateComponent } from "../../Components";

import login_img from "../../assets/login_img.png";

const LoginPage = () => {
  return (
    <div className="w-full min-h-[92vh] bg-richblack-900 flex justify-center">
      <AuthTemplateComponent
        heading={"Welcome Back"}
        subheading={"Build skills for today, tomorrow, and beyond."}
        sub_subheading={" Education to future-proof your career."}
        fromType={"login"}
        image={login_img}
      />
    </div>
  );
};

export default LoginPage;
