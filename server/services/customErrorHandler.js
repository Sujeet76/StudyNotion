class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    (this.message = message), (this.status = status);
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }
  static badRequest(message = "Bad Request") {
    return new CustomErrorHandler(400, message);
  }
  static wrongCredentials(message = "User or password is wrong") {
    return new CustomErrorHandler(422, message);
  }
  static unAuthorized(message = "UnAuthorized") {
    return new CustomErrorHandler(401, message);
  }
  static forbidden(message = "Forbidden") {
    return new CustomErrorHandler(403, message);
  }
  static notFound(message = "Data not found") {
    return new CustomErrorHandler(404, message);
  }
  static noUpdate(message = "update failed") {
    return new CustomErrorHandler(204, message);
  }
  static serverError(message = "InternalServer error") {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
