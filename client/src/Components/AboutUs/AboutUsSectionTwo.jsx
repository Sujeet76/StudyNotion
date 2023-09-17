import React from "react";
import { HighLightedTextComponent } from "../index";

const AboutusSectionTwo = () => {
  return (
    <section className="min-h-[336px] flex flex-col justify-center text-center items-center border-b border-b-richblack-800 pb-10">
      <h2 className="lg:text-3xl text-2xl lg:text-center text-start  text-richblack-100 font-semibold w-[75%] mt-24">
        We are passionate about revolutionizing the way we learn. Our innovative
        platform <HighLightedTextComponent text={"combines technology"} />,
        <HighLightedTextComponent
          text={"expertise"}
          additionClass="bg-gradient-to-br from-[#FF512F] via-[#F09819] to-[#F09819]"
        />
        , and community to create an{" "}
        <HighLightedTextComponent
          text={"unparalleled educational experience"}
          additionClass="bg-gradient-to-br from-[#E65C00] to-[#F9D423]"
        />
        .
      </h2>
    </section>
  );
};

// bg-gradient-to-br from-purple-600 via-red-500 to-yellow-300

export default AboutusSectionTwo;
