import { HighLightedTextComponent } from "../";

import about1 from "../../assets/aboutus1.webp";
import about2 from "../../assets/aboutus2.webp";
import about3 from "../../assets/aboutus3.webp";

const AboutusSectionOne = () => {
  return (
    <div className="bg-richblack-700 flex flex-col items-center">
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-richblack-5">
        <header className="mx-auto py-20 text-4xl font-semibold lg:w-[67%]">
          Driving Innovation in Online Education for a{" "}
          <HighLightedTextComponent text={"Brighter Future"} />
          <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </header>
        <div className="sm:h-[70px] lg:h-[150px]"></div>
        <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
          <img src={about1} alt="" />
          <img src={about2} alt="" />
          <img src={about3} alt="" />
        </div>
      </div>
    </div>
  );
};

// background: linear-gradient(118.41deg, #E65C00 -6.05%, #F9D423 106.11%);
// #424854
// #161D29
export default AboutusSectionOne;
