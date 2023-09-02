// library
import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { PORT } from "./config/index.js";

// config
import dbConnect from "./config/database.js";
import cloudinaryConnect from "./config/cloudinaryConnect.js";

// // routes
// import userRoute from "./routes/User.routes.js";
// import profileRoute from "./routes/Profile.routes.js";
// import courseRoute from "./routes/Course.routes.js";
import { userRoute, profileRoute, courseRoute } from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

const PORT_NO = PORT || 5000;

app.use(json());
app.use(cookieParser());
app.use(cors());
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

dbConnect();
cloudinaryConnect();

app.use(errorHandler);

app.listen(PORT_NO, () => {
  console.log("Server has been started on port number " + PORT_NO);
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
  });
  res.send("<center><h1>Server started</h1></center>");
});
