import { Response, Request, NextFunction } from "express";
import { ErrorResponseModel } from "../models/errorResponse.model";
import log from "../services/logger";

const invalidPathHandler = (
  req: Request,
  res: Response<ErrorResponseModel>,
  next: NextFunction
) => {
  log.error("invalid path |path:" + req.originalUrl);
  res.status(404);
  res.json({ success: false, status: 404, data: "invalid path" });
};

export default invalidPathHandler;
