import { Link } from "react";

const GenericContainerComponent = ({ heading, subheading, children }) => {
  return (
    <div className="bg-richblack-900 w-11/12 lg:h-[calc(100vh-3.5rem)] h-[calc(100vh - 82px)] grid place-content-center p-8">
      <div className="lg:max-w-[33rem] w-full p-8 ">
        <h1 className="lg:text-4xl text-3xl text-richblack-5 font-semibold">
          {heading}
        </h1>
        <p className=" mt-3 lg:text-lg text-base text-richblack-100 font-normal">
          {subheading}
        </p>
        {children}
      </div>
    </div>
  );
};

export default GenericContainerComponent;
