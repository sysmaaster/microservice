import { NextFunction, Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { HTTP_Status } from "../utils/HTTP_Status";
import { ErrorResponseModel } from "../models/errorResponse.model";
import log from "../services/logger";

/**
 * send status BAD_REQUEST 400
 * @param req
 * @param res
 * @param next
 * @return ErrorResponseModel
 */
export const InputValidationMiddleware = (
  req: Request,
  res: Response<ErrorResponseModel>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const data = matchedData(req);
    log.error({
      in: "InputValidation",
      data: errors.array(),
    });
    res.status(HTTP_Status.BAD_REQUEST_400).json({
      success: false,
      status: 400,
      data: errors.array(),
    });
    return;
  } else {
    next();
  }
};
