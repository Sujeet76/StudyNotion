import cloudinary from "cloudinary";
import {
  CLOUDINARY_KEY,
  CLOUDINARY_SECRETE,
  CLOUDINARY_NAME,
} from "./index.js";

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRETE,
    });
    console.log("connected to cloudinary");
  } catch (error) {
    console.log("Error while connecting to cloudinary");
    console.log(error.message);
  }
};

export default cloudinaryConnect;
