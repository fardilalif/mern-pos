import { StatusCodes } from "http-status-codes";

const errorHandleMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "something went wrong, try again later";

  // mongoDb invalid id format
  if (err.name === "CastError") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "invalid mongoDb id format";
  }

  res.status(statusCode).json({ msg: message });
};

export default errorHandleMiddleware;
