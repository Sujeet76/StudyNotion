import { features } from "../../data";
import TimelineImage from "../../assets/TimelineImage.png";

const WhatWeOfferComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between mx-auto items-center gap-6 w-11/12">
      <div className="-mt-4 self-start">
        {features.map(({ title, subtitle, icon }, index) =>
          index === features.length - 1 ? (
            <ImgAndContent
              title={title}
              subtitle={subtitle}
              icon={icon}
              key={index}
              isBorder={false}
            />
          ) : (
            <ImgAndContent
              title={title}
              subtitle={subtitle}
              icon={icon}
              key={index}
              isBorder={true}
            />
          )
        )}
      </div>

      <div className="relative lg:h-[600px] shadow-lg rounded">
        <div className="shadow-[5px_-5px_50px_-5px] shadow-blue-200 rounded relative">
          <img
            src={TimelineImage}
            alt="timeline image"
            className="shadow-[20px_20px_rgba(255,255,255)] rounded lg:max-w-[714px] lg:max-h-[545px] object-cover"
          />
        </div>
        <div className="lg:w-[511px] lg:gap-4 gap-[10px] lg:h-[128px]   bg-caribbeangreen-700 flex lg:flex-row flex-col justify-center items-center mx-auto absolute bottom-[70px] right-[50%] transform lg:translate-x-1/2 lg:translate-y-1/2 rounded translate-y-[-5%] translate-x-[7%] lg:p-0 py-4 px-3">
          <div className="lg:w-[40%] w-[80%]  flex lg:gap-6 gap-4 justify-center items-center">
            <span className="lg:text-4xl text-2xl text-white font-inter font-[700]">
              10
            </span>
            <span className="text-sm font-[500] font-inter text-caribbeangreen-300">
              YEARS EXPERIENCES
            </span>
          </div>
          <div className="lg:border lg:border-caribbeangreen-500 lg:h-11"></div>
          <div className="flex lg:w-[35%] w-[80%] justify-center items-center lg:gap-6 gap-4">
            <span className="lg:text-4xl text-2xl text-white font-inter font-[700]">
              250
            </span>
            <span className="text-sm font-[500] font-inter text-caribbeangreen-300">
              TYPES OF COURSES
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgAndContent = ({ title, subtitle, icon, isBorder }) => {
  return (
    <div className="flex lg:gap-6 gap-3">
      <div className="flex flex-col  item-center  justify-center ">
        <div
          className="flex justify-center items-center w-14 h-14 rounded-full shadow-custom lineDash relative"
          style={{ boxShadow: "0px 0px 62px 0px #0000001F" }}
        >
          <img src={`${icon}`} alt={icon} />
        </div>
        <div
          className={`${
            isBorder === true ? "border-r-2 h-[42px] w-[1px]" : "border-none"
          } border-dashed border-richblack-100 mx-auto my-[12px]`}
        ></div>
      </div>
      <div className="mt-2">
        <p className="text-lg font-semibold font-inter text-richblack-800 mb-1">
          {title}
        </p>
        <p className="text-sm font-normal text-richblack-700">{subtitle}</p>
      </div>
    </div>
  );
};

export default WhatWeOfferComponent;
