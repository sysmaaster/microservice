import ErrorException from "../exceptions/error.exception";
import { NextFunction, Request, Response } from "express";
import { ErrorResponseModel } from "../models/errorResponse.model";
/**
 * @param error
 * @param req
 * @param res
 * @param next
 */
function errorMiddleware(
  error: ErrorException,
  req: Request,
  res: Response<ErrorResponseModel>,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.header("Content-Type", "application/json");
  res.status(status).json({
    success: false,
    status: status,
    data: message,
  });
}

export default errorMiddleware;
