import { DEBUG_MODE } from "../config/index.js";
import Joi from "joi";
import CustomErrorHandler from "../services/customErrorHandler.js";

const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let data = {
    success: false,
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: error.message }),
  };

  // instanceof tell error belongs to which class(type like server or validation)
  const { ValidationError } = Joi;
  if (error instanceof ValidationError) {
    // console.log(error.message);
    statusCode = 422; //validation error
    data = {
      success: false,
      message: error.message,
    };
  }

  // we returned from custom-class
  if (error instanceof CustomErrorHandler) {
    statusCode = error.status;
    data = {
      success: false,
      message: error.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
