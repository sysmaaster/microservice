import { NextFunction, Request, Response } from "express";
import ErrorException from "../exceptions/error.exception";
import log from "../services/logger.service";

const errorLoggerHandler = (
  err: ErrorException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.error(err.message);
  next(err); // calling next middleware
};

export default errorLoggerHandler;
