import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  // Pagination,
  FreeMode,
  Navigation,
  Mousewheel,
  // Lazy,
} from "swiper/modules";
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import "./customSwiper.css";

import CourseCard from "./CourseCard";

const CourseSlider = ({ data, id }) => {
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const swiperRef = useRef(null);
  const swiperRef2 = useRef(null);
  const handelSlideChange = (e) => {
    const { isEnd, isBeginning } = e;

    setIsBeginning(isBeginning);
    setIsEnd(isEnd);
  };

  return (
    <div className="relative mt-10">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={25}
        navigation={{
          prevEl: `#prev-button-${id}`,
          nextEl: `#next-button-${id}`,
        }}
        // pagination={{
        //   dynamicBullets: true,
        //   clickable: true,
        // }}
        mousewheel={{
          enable: true,
          sensitivity: 1,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[FreeMode, Navigation, Mousewheel]}
        onSlideChange={handelSlideChange}
      >
        {data?.map((content) => (
          <SwiperSlide key={content?._id}>
            <CourseCard content={content} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`${
          isEnd && "hidden"
        } group customButton right-0 translate-x-3`}
        ref={swiperRef2}
        id={`next-button-${id}`}
      >
        <NavigateIcon className="group-hover:fill-yellow-50 transition-all" />
      </div>
      <div
        className={`${
          isBeginning && "hidden"
        } group customButton left-0 rotate-180 -translate-x-3`}
        ref={swiperRef2}
        id={`prev-button-${id}`}
      >
        <NavigateIcon className="group-hover:fill-yellow-50 transition-all" />
      </div>
    </div>
  );
};

const NavigateIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      // fill="none"
      className={`fill-[#F1F2FF] ${className}`}
    >
      <path
        d="M10.8094 19.207L9.39844 17.793L14.6874 12.5L9.39844 7.20697L10.8134 5.79297L16.0984 11.086C16.4734 11.461 16.684 11.9696 16.684 12.5C16.684 13.0303 16.4734 13.5389 16.0984 13.914L10.8094 19.207Z"
        // fill="#F1F2FF"
      />
    </svg>
  );
};

export default CourseSlider;
