import { useState, useEffect } from "react";

import { DeleteIcon } from "../Dashboard/AddCourse/courseBuilder/Icon";

import { RatingStars } from "../";

import GetAvgRating from "../../utils/avgRating";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToCart } from "../../Slice/cart";

const CartCard = ({ content }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const count = GetAvgRating(content?.ratingAndReview);
    setAvgReviewCount(count);
  }, []);

  const removeFromCart = (id) => {
    // console.log("clicked");
    dispatch(removeToCart(id));
  };

  return (
    <div className="flex justify-between lg:flex-row md:flex-row flex-col gap-4 border-b border-richblack-700 last:pb-0 last:border-none pb-10">
      {/* image container */}
      <div className="flex lg:flex-row md:flex-row flex-col  gap-3">
        <img
          src={content?.thumbnail}
          alt={content?.courseName}
          className=" max-w-[11.5rem] object-cover rounded-lg"
        />
        <div className="text-sm text-richblack-300">
          <h4
            className="text-xl font-medium text-richblack-5 mb-2 hover:text-caribbeangreen-200 hover:underline transition-duration duration-200 cursor-pointer"
            onClick={() => navigate(`/course/${content._id}`)}
          >
            {content?.courseName}
          </h4>
          <p className="mb-2">
            Created By{" "}
            <span className="italic underline font-semibold">
              {content?.authName ?? "Admin"}
            </span>
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-5">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {content?.ratingAndReview?.length} Ratings
            </span>
          </div>
          <p>
            • Total section {content?.totalSection ?? 0} • Total Lecture{" "}
            {content?.totalLecture ?? 0}
          </p>
        </div>
      </div>

      {/* // button container -> remove */}
      <div className="self-start">
        <button
          className="flex justify-center items-center p-3 text-pink-200 border border-richblack-700 bg-richblack-800 rounded-lg gap-2 group hover:text-caribbeangreen-100 transition-all duration-200"
          onClick={() => removeFromCart(content._id)}
        >
          <DeleteIcon className="fill-pink-200 w-5 h-5 group-hover:fill-caribbeangreen-100 transition-all duration-200 group-hover:scale-75" />
          Remove
        </button>
        <p className="mt-5 text-xl text-yellow-50 font-semibold">
          Rs {content?.price}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
