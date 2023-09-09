import toast from "react-hot-toast";
import { apiConnector } from "../../utils/axios";
import { studentEndpoints } from "../api";

import rzp_logo from "../../assets/rzp_logo.png";
import { resetCourseState, setPaymentLoading } from "../../Slice/course";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const buyCourse = async (
  courses,
  token,
  userDetails,
  navigate,
  dispatch
) => {
  let toastId = toast.loading("Processing payment details, Please wait");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Error while loading script", {
        id: toastId,
      });
      console.log(res);
      return;
    }

    const paymentResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    const { data } = paymentResponse;      
    const options = {
      key: "rzp_test_tJl5VHPhN8vclg",
      amount: data?.data?.amount,
      currency: data?.data?.currency,
      order_id: data?.data?.id,
      name: "StudyNotion",
      description: "Thank you for purchasing course",
      prefill: {
        name: `${userDetails.name}`,
        email: `${userDetails.email}`,
      },
      handler: function (response) {
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
        sendPaymentMail(response, data?.data?.amount, token);
      },
      image: rzp_logo,
      theme: {
        color: "#161D29",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", (response) => {
      toast.error("Oops, Payment failed");
      console.log(response.error);
    });
    // toast.dismiss(toastId);
  } catch (err) {
    const { response } = err;
    console.log(err);
    const errMessage = response?.data?.message || "Error while payment";
    toast.error(errMessage, {
      id: toastId,
    });
    // toast.dismiss(toastId);
  }
};

const sendPaymentMail = async (response, amount, token) => {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (err) {
    const { response } = err;
    console.log(err);
    const errMessage =
      response?.data?.message || "Error while sending payment mail";
    toast.error(errMessage);
  }
};

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
  const toastId = toast.loading("Verifying payment details");
  try {
    console.log(bodyData);
    dispatch(setPaymentLoading(true));
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    navigate("/dashboard/enrolled-course");
    dispatch(resetCourseState());
    toast.success("Payment successful, Please check you course list", {
      id: toastId,
    });
  } catch (err) {
    const { response } = err;
    console.log(err);
    const errMessage = response?.data?.message || "Error while verify payment";
    toast.error(errMessage, { id: toastId });
  }
};
