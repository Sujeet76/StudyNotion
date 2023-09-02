import React from "react";

const CardCourse = ({ img, title, description, date, status }) => {
  return (
    <div className="flex justify-start items-center">
      <img
        src={img}
        alt={title}
        className="max-w-[13.8rem] rounded-lg object-cover"
      />
      <div className="flex flex-col gap-2 ml-6 items-start text-start">
        <h5 className="text-lg font-semibold text-richblack-5">{title}</h5>
        <p className="text-sm text-richblack-100">{description}</p>
        <p className="text-xs text-richblack-25">Created: {date}</p>
        <div
          className={`flex gap-y-[0.375rem] rounded-full py-1 px-2 text-xs font-medium bg-richblack-700 ${
            status === "Published" ? "text-yellow-100" : "text-pink-100"
          }`}
        >
          {status === "Published" ? <IconPublished /> : <IconDrafted />}
          {status}
        </div>
      </div>
    </div>
  );
};

const IconPublished = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99961 14.3996C11.5342 14.3996 14.3996 11.5342 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 11.5342 4.46499 14.3996 7.99961 14.3996ZM11.0849 6.55251C11.2798 6.28452 11.2205 5.90927 10.9525 5.71437C10.6845 5.51946 10.3093 5.57871 10.1144 5.84671L7.32736 9.67884L5.82387 8.17534C5.58956 7.94103 5.20966 7.94103 4.97535 8.17534C4.74103 8.40966 4.74103 8.78956 4.97535 9.02387L6.97535 11.0239C7.09942 11.148 7.2716 11.2115 7.44654 11.1978C7.62148 11.184 7.78164 11.0944 7.88485 10.9525L11.0849 6.55251Z"
        fill="#FFD60A"
      />
    </svg>
  );
};

const IconDrafted = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99961 14.3996C11.5342 14.3996 14.3996 11.5342 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 11.5342 4.46499 14.3996 7.99961 14.3996ZM8.74961 3.99961C8.74961 3.5854 8.41382 3.24961 7.99961 3.24961C7.5854 3.24961 7.24961 3.5854 7.24961 3.99961V7.99961C7.24961 8.41382 7.5854 8.74961 7.99961 8.74961H11.1996C11.6138 8.74961 11.9496 8.41382 11.9496 7.99961C11.9496 7.5854 11.6138 7.24961 11.1996 7.24961H8.74961V3.99961Z"
        fill="#F79CB0"
      />
    </svg>
  );
};

export default CardCourse;
