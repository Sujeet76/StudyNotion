import { Link } from "react";

const GenericContainerComponent = ({ heading, subheading, children }) => {
  return (
    <div className="bg-richblack-900 w-full h-[calc(100vh-3.5rem)] grid place-content-center">
      <div className="max-w-[33rem] p-8 ">
        <h1 className="text-4xl text-richblack-5 font-semibold">{heading}</h1>
        <p className=" mt-3 text-lg text-richblack-100 font-normal">
          {subheading}
        </p>
        {children}
      </div>
    </div>
  );
};

export default GenericContainerComponent;
