import Razorpay from "razorpay";
import { RAZORPAY_KEY, RAZORPAY_SECRETE } from "./index.js";

export default instance = new Razorpay({
  key_id: RAZORPAY_KEY,
  key_secret: RAZORPAY_SECRETE,
});
