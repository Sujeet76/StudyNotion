import { FaXmark } from "react-icons/fa6";
import ReactFormTextarea from "../../Common/ReactFormTextarea";
import ButtonDashboard from "../../Common/ButtonDashboard";
import { reviewAndRating } from "../../../services/Operation/CourseApi";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import ReactStars from "react-rating-stars-component";

const ReviewModal = ({ setReviewModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((store) => store.profile);
  const { token } = useSelector((store) => store.auth);
  const { courseId } = useParams();

  useEffect(() => {
    setValue("review", "");
    setValue("rating", 1);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("rating", newRating);
  };

  const onSubmit = async (data) => {
    const reviewData = {};
    reviewData.userId = user?._id;
    reviewData.courseId = courseId;
    reviewData.rating = data?.rating;
    reviewData.review = data?.review;
    await reviewAndRating(token, reviewData, setReviewModal);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-richblack-800 rounded-lg lg:w-[41.5rem]">
        {/* header */}
        <div className="p-6 flex justify-between items-center bg-richblack-700 border-b border-b-richblack-25 rounded-t-lg">
          <h1 className="text-lg text-richblack-5 font-bold">Add Review</h1>
          <i
            onClick={() => setReviewModal(false)}
            className="group cursor-pointer"
          >
            <FaXmark className="text-richblack-25 w-6 h-6 group-hover:text-caribbeangreen-100 group-hover:scale-110 transition-all" />
          </i>
        </div>

        {/* name and image */}
        <div className="p-8">
          <div className="flex items-center justify-center gap-x-3">
            <img
              src={user?.img}
              alt={user?.name}
              className="w-14 h-14 rounded-full"
            />
            <div className="text-richblack-25">
              <p className="font-semibold capitalize">{user?.name}</p>
              <p className="text-sm">Posting Publicly</p>
            </div>
          </div>
          <div className="mx-auto w-max mt-6">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              value={1}
              size={30}
              activeColor="#ffd700"
            />
          </div>
        </div>

        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
          <ReactFormTextarea
            label="Add Your Experience"
            id="review"
            placeholder="Share Details of your own experience for this course"
            error="Review is required field"
            errors={errors}
            register={register}
            required={true}
          />

          <div className="flex gap-x-4 mt-8 ml-auto w-max">
            <ButtonDashboard
              typeBtn="button"
              clickHandler={() => setReviewModal(false)}
            >
              Cancel
            </ButtonDashboard>
            <ButtonDashboard isActive={true} typeBtn="submit">
              Save
            </ButtonDashboard>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ReviewModal;
