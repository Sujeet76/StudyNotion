import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import banner from "../../assets/banner.mp4";

import {
  Button,
  HighLightedTextComponent,
  CodingBlockComponent,
  CodingLeftComponent,
  TabCardComponent,
} from "../";

const SectionOneComponent = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-11/12 flex flex-col items-center gap-12">
        <Link
          to="/signup"
          className="group self-start lg:self-center bg-richblack-800 text-richblack-200 text-center w-[240px] h-[44px] mt-16 p-1 rounded-full border-richblack-800 border-2  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:bg-richblack-900 hover:font-semibold hover:scale-95 transition-all duration-300 hover:drop-shadow-none hover:border-4 flex justify-center items-center"
        >
          <button className="flex gap-2 items-center justify-center text-base font-inter font-[500]">
            Become a Instructor
            <FaArrowRight />
          </button>
        </Link>
        <div className="text-start lg:text-center lg:w-[65%] mt-[2px]">
          <h1 className="text-3xl  lg:text-4xl text-richblack-5 font-semibold mb-4">
            Empower Your Future with{" "}
            <HighLightedTextComponent text="Coding Skills" />
          </h1>
          <p className="font-medium text-richblack-300">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
        </div>
        <div className="flex gap-6 self-center">
          <Button active={true} linkTo="/login">
            Learn More
          </Button>
          <Button linkTo="/signup">Book a Demo</Button>
        </div>
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-lg">
          <video
            className="shadow-[12px_12px_rgba(255,255,255)] lg:shadow-[20px_20px_rgba(255,255,255)] rounded-lg"
            muted
            loop
            autoPlay
          >
            <source src={banner} type="video/mp4" />
          </video>
        </div>
        {/* first card container */}
        <div className="flex flex-col lg:flex-row md:flex-row gap-8 lg:justify-between w-11/12 lg:mx-auto items-center  lg:mt-[84px]">
          {/* left */}
          <CodingLeftComponent
            heading={
              <h1 className="text-4xl lg:text-4xl text-richblack-5 font-inter font-semibold">
                Unlock your{" "}
                <HighLightedTextComponent text={"coding potential"} /> with our
                online courses.
              </h1>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            btn1={{
              active: true,
              linkTo: "/signup",
              children: "Try it Yourself",
            }}
            btn2={{
              active: false,
              linkTo: "/login",
              children: "Learn More",
            }}
          />
          {/* right */}
          <CodingBlockComponent
            codeContent={
              '<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one">One</a>\n<a href="two">Two</a>\n<a href="#">Three</a>\n</nav>\n</body>'
            }
            bgColor={"codeblock1"}
            fontColor={"text-yellow-25"}
          />
        </div>
        {/* second card container */}
        <div className="flex flex-col gap-8 md:flex-row-reverse  lg:flex-row-reverse lg:justify-between w-11/12 items-center lg:mx-auto lg:mt-[88px] md:mt-[88px]">
          {/* left */}
          <CodingLeftComponent
            heading={
              <h1 className="text-3xl lg:text-4xl text-richblack-5 font-inter font-semibold lg:w-[40%]">
                Start <HighLightedTextComponent text={"coding in seconds"} />
              </h1>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            btn1={{
              active: true,
              linkTo: "/login",
              children: "Continue Lesson",
            }}
            btn2={{
              active: false,
              linkTo: "/signup",
              children: "Learn More",
            }}
          />
          {/* right */}
          <CodingBlockComponent
            codeContent={
              '<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one">One</a>\n<a href="two">Two</a>\n<a href="#">Three</a>\n</nav>\n</body>'
            }
            bgColor={"codeblock2"}
            fontColor={"text-richblack-5"}
          />
        </div>
        <TabCardComponent />
      </div>
    </section>
  );
};

export default SectionOneComponent;
