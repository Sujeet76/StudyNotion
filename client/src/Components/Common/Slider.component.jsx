import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  // Pagination,
  // FreeMode,
  Autoplay,
  // Mousewheel,
  // Lazy,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import { apiConnector } from "../../utils/axios";
import { ratingsEndpoints } from "../../services/api";

const SliderComponent = ({className}) => {
  const { token } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);

  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_ALL_DETAILS_API,
          null
        );
        // console.log(response?.data?.data);
        setReviewData(response?.data?.data);
        setIsLoading(false);
        return;
      } catch (err) {
        const { response } = err;
        // console.log(response);
        console.error(err);
        const errorMessage =
          response?.data?.message ?? "Could not get review and rating";
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`lg:mx-auto py-8 px-4 mt-8 font-inter ${className}`}>
      <p className="text-3xl text-richblack-25 font-semibold text-center">
        Reviews from other learners
      </p>

      <div className="mx-auto h-[184px] max-w-maxContentTab lg:max-w-maxContent mt-14">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768:{
              slidesPerView : 2
            }
          }}
          className="w-full"
          modules={[ Autoplay]}
        >
          {reviewData.map((content) => (
            <SwiperSlide key={content._id} className="rounded-lg">
              <div className="bg-richblack-800 p-4 rounded-lg flex flex-col gap-y-3 min-h-[217.5px] w-100%">
                {/* user and course name and img */}
                <div className="flex items-center  gap-3">
                  <img
                    src={content?.user?.img}
                    alt={content?.user?.name ?? "student"}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="text-sm text-richblack-5 font-semibold">
                      {content?.user?.name}
                    </p>
                    <p className="text-xs text-richblack-600 mt-1 font-medium">
                      {content?.course?.courseName}
                    </p>
                  </div>
                </div>
                {/* review des */}
                <div>
                  <p className="capitalize text-richblack-25 my-3 text-sm">{`${
                    content?.review.split(" ").slice(0, 20).join(" ") ??
                    "Awesome"
                  } ...`}</p>
                  <div className="flex gap-x-2 items-center -mt-1">
                    <span className="text-yellow-100 font-semibold">{content?.rating.toFixed(1)}</span>
                    <ReactStars
                      count={5}
                      edit={false}
                      value={content?.rating}
                      size={25}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderComponent;
