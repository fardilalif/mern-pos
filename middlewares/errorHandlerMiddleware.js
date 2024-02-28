import { StatusCodes } from "http-status-codes";

const errorHandleMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "something went wrong, try again later";

  res.status(statusCode).json({ msg: message });
};

export default errorHandleMiddleware;
