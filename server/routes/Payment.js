import { Router } from "express";

import {
  capturePayment,
  sendMail,
  verifyPayment,
} from "../controllers/index.js";
import { isStudent, auth } from "../middleware/auth.js";

const paymentRoute = new Router();

paymentRoute.post("/capturePayment", auth, isStudent, capturePayment);
paymentRoute.post("/verifyPayment", auth, isStudent, verifyPayment);
paymentRoute.post("/sendPaymentSuccessEmail", auth, isStudent, sendMail);

export default paymentRoute;
