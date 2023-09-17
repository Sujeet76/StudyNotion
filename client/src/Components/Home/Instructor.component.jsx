// import HighlightText from "./HighlightText.component";
// import Button from "../Common/Button.component";
import { HighLightedTextComponent, Button } from "../";
import instructor from "../../assets/instructor_img.png";
import { FaArrowRight } from "react-icons/fa";
const InstructorComponent = () => {
  return (
    <div className="w-11/12 pl-4 flex lg:flex-row flex-col items-center justify-center lg:gap-24 gap-16 mx-auto">
      <div>
        <img
          src={instructor}
          alt=""
          className="shadow-[-20px_-20px_rgba(255,255,255)] rounded  lg:max-w-[714px] max-h-[545px]"
        />
      </div>
      <div className="text-start lg:w-[40%]">
        <h1 className="text-4xl text-richblack-5 font-semibold lg:w-[50%]">
          Become an <HighLightedTextComponent text={"instructor"} />
        </h1>
        <p className="text-base font-[500] text-richblack-300 mt-3 lg:w-[60%]">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="mt-16 lg:text-start text-center">
          <Button active={true} linkTo={"/signup"}>
            Start teaching today{" "}
            <FaArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructorComponent;
