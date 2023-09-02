import { AuthTemplateComponent } from "../../Components";

import signup_img from "../../assets/signup-img.png";

const SignupPage = () => {
  return (
    <div className="w-full min-h-[calc(130vh-3.5rem)] bg-richblack-900 flex justify-center">
      <AuthTemplateComponent
        heading={"Join the millions learning to code with StudyNotion for free"}
        subheading={"Build skills for today, tomorrow, and beyond."}
        sub_subheading={" Education to future-proof your career."}
        fromType={"signup"}
        image={signup_img}
      />
    </div>
  );
};

export default SignupPage;
