// library
import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { PORT } from "./config/index.js";

// config
import dbConnect from "./config/database.js";
import cloudinaryConnect from "./config/cloudinaryConnect.js";

// routes
import {
  userRoute,
  profileRoute,
  courseRoute,
  paymentRoute,
} from "./routes/index.js";

// error handler
import errorHandler from "./middleware/errorHandler.js";
import contactRoute from "./routes/contactRoute.js";

// instance of express
const app = express();

// port number from env
const PORT_NO = PORT || 5000;

//
app.use(json());
app.use(cookieParser());

// to restrict the access of api
app.use(cors());

// upload file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// router path
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/reach", contactRoute);

// calling db connect and cloudinaryConnect
dbConnect();
cloudinaryConnect();

// custom error handler as middleware
app.use(errorHandler);

// server stated
app.listen(PORT_NO, () => {
  console.log("Server has been started on port number " + PORT_NO);
});

// message to display that server has been started
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
  });
});
