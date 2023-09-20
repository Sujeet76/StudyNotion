import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FaRegShareFromSquare } from "react-icons/fa6";

import { Button, ConfirmationModal } from "../";

import { addToCart } from "../../Slice/cart";
import { AnimatePresence } from "framer-motion";
import { buyCourse } from "../../services/Operation/paymentApi";
import { getTotalNumberOfLecture } from "../../utils/convertTime";

const PurchaseCard = ({ courseContent }) => {
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const purchaseCourseHandler = () => {
    if (token) {
      // console.log(user);
      const userDetails = {};
      userDetails.name = user?.name;
      userDetails.email = user?.email;
      buyCourse([courseId], token, userDetails, navigate, dispatch);
      // console.log(courseId);
      // console.table(userDetails);
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  const addToCartHandler = (data) => {
    if (token) {
      // console.log(data);
      let temp = { ...data };
      delete temp.instructor;
      delete temp.courseContent;
      delete temp.studentEnrolled;
      delete temp.category;
      delete temp.tags;
      delete temp.sold;
      delete temp.instructions;
      temp.totalLecture = getTotalNumberOfLecture(data.courseContent);
      temp.totalSection = data.courseContent.length;
      temp.authName = data?.instructor?.name;
      dispatch(addToCart(temp));
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add To Cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  const copyUrl = async () => {
    try {
      const result = await navigator.clipboard.writeText(window.location.href);
      toast.success("Url has been copied");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      // console.log(error);
      toast.error("could not copy url");
    }
  };

  return (
    <div>
      <div className="bg-richblack-700 lg:w-[24rem] md:w-[25rem] w-[20rem] rounded-lg overflow-hidden absolute lg:right-0 lg:top-0 lg:translate-x-0 lg:max-xl:right-0 lg:max-xl:top-0 lg:max-xl:translate-x-0 right-1/2 translate-x-1/2 top-[78%]">
        <img
          src={courseContent?.thumbnail}
          alt={courseContent?.courseName}
          className="lg:w-[24rem] lg:h-[12.5rem] w-full object-cover"
        />
        <div className="p-6 flex flex-col gap-4">
          <p className="text-3xl text-richblack-5 font-bold">
            Rs.{courseContent?.price}
          </p>
          <Button
            clickHandler={purchaseCourseHandler}
            className="w-full"
            active={true}
          >
            Buy now
          </Button>
          <Button
            clickHandler={() => addToCartHandler(courseContent)}
            className="w-full"
          >
            Add to cart{" "}
          </Button>
          <p className="text-sm text-richblack-25 text-center">
            30-Day Money-Back Guarantee
          </p>
          <div>
            <h4 className="text-richblack-5">This course includes:</h4>
            <p className="text-sm text-caribbeangreen-100">
              {courseContent?.WhatYouLearn}
            </p>
          </div>
          <button
            className="w-full p-6 text-yellow-100 flex justify-center items-center"
            onClick={copyUrl}
          >
            <FaRegShareFromSquare /> {!isCopied ? "Share" : "copied!"}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseCard;
