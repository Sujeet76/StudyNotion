import { useEffect, useState } from "react";

import GetAvgRating from "../../utils/avgRating";
import RatingStars from "../Common/RatingAndReview";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ content, height = "h-[250px]" }) => {
  const navigate = useNavigate();
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(content?.ratingAndReview);
    setAvgReviewCount(count);
  }, [content]);

  const courseHandler = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div>
      {/* thumbnail */}
      <img
        src={content?.thumbnail}
        alt={content?.courseName}
        loading="lazy"
        className={`w-full ${height} rounded-lg object-cover`}
      />
      {/* courseName */}
      <p
        className="font-medium mt-5 hover:underline  hover:decoration-2 hover:text-caribbeangreen-100 cursor-pointer transition-all duration-200"
        onClick={() => courseHandler(content._id)}
      >
        {content?.courseName}
      </p>
      {/* name */}
      <p className="text-richblack-300 mt-2">{`${content?.courseDetails.substr(
        0,
        95
      )}...`}</p>
      {/* rating */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-yellow-5">{avgReviewCount || 0}</span>
        <RatingStars Review_Count={avgReviewCount} />
        <span className="text-richblack-400">
          {content?.ratingAndReview?.length} Ratings
        </span>
      </div>
      {/* price */}
      <p className="font-semibold text-lg mt-2">Rs {content?.price}</p>
    </div>
  );
};

export default CourseCard;
