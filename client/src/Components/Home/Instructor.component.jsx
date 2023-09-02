// import HighlightText from "./HighlightText.component";
// import Button from "../Common/Button.component";
import { HighLightedTextComponent, Button } from "../";
import instructor from "../../assets/instructor_img.png";
import { FaArrowRight } from "react-icons/fa";
const InstructorComponent = () => {
  return (
    <div className=" w-11/12 flex justify-between items-center gap-24 mx-auto">
      <div>
        <img
          src={instructor}
          alt=""
          className="shadow-[-20px_-20px_rgba(255,255,255)] rounded  max-w-[714px] max-h-[545px]"
        />
      </div>
      <div className="">
        <h1 className="text-4xl text-richblack-5 font-semibold w-[50%]">
          Become an <HighLightedTextComponent text={"instructor"} />
        </h1>
        <p className="text-base font-[500] text-richblack-300 mt-3 w-[80%]">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="mt-16">
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
