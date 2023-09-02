import React from "react";

import {
  Button,
  HighLightedTextComponent,
  LanguagesComponent,
  SectionOneComponent,
  WhatWeOfferComponent,
  SliderComponent,
  InstructorComponent,
} from "../Components";

const HomePage = () => {
  return (
    <div className="text-white w-full">
      {/* section 1 */}
      <SectionOneComponent />

      {/* section 2 */}
      <section className="flex flex-col justify-center items-center bg-pure-greys-5 relative text-richblack-900">
        <div className="w-11/12 flex flex-col gap-14">
          {/* heading */}
          <div className="flex lg:flex-row flex-col mx-auto justify-between mt-9 lg:mt-24 gap-3">
            <div>
              <h1 className="text-4xl font-semibold">
                Get the skills you need for a{" "}
                <HighLightedTextComponent text={"job that is in demand."} />
              </h1>
            </div>
            <div className="flex flex-col gap-12">
              <p className="p-1">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <Button active={true}>Learn More</Button>
            </div>
          </div>
          {/* what we offer */}
          <WhatWeOfferComponent />
          <LanguagesComponent />
        </div>
      </section>

      {/* section 3 */}
      <section className="w-full flex flex-col justify-center mx-auto py-[90px]">
        <InstructorComponent />
        <SliderComponent />
      </section>
    </div>
  );
};

export default HomePage;
