import JwtService from "../services/JwtService.js";
import CustomErrorHandler from "../services/customErrorHandler.js";

// verify token
export const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }
  let token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const { id, role } = await JwtService.verify(token);
    console.log("auth ", { id }, role);
    req.user = {};
    req.user.id = id;
    req.user.role = role;
    next();
  } catch (error) {
    return next(
      CustomErrorHandler.unAuthorized("Unauthorize! Invalid credential")
    );
  }
};

// isStudent
// isStudent
export const isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return next(
        CustomErrorHandler.unAuthorized(
          "Unauthorize to enter in this route only Student can access"
        )
      );
    }
    next();
  } catch (error) {
    return next(CustomErrorHandler.serverError(error.message));
  }
};

// isAdmin
export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return next(
        CustomErrorHandler.unAuthorized(
          "Unauthorize to enter in this route only Admin can access"
        )
      );
    }
    next();
  } catch (error) {
    return next(CustomErrorHandler.serverError(error.message));
  }
};

// isInstructor
export const isInstructor = (req, res, next) => {
  try {
    if (req.user.role !== "Instructor") {
      return next(
        CustomErrorHandler.unAuthorized(
          "Unauthorize to enter in this route only Instructor can access"
        )
      );
    }
    next();
  } catch (error) {
    return next(CustomErrorHandler.serverError(error.message));
  }
};
