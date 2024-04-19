import { ErrorResponseModel } from "../models/errorResponse.model";
import log from "../services/logger.service";

export const getUnauthorizedResponse = (req: any): ErrorResponseModel => {
  log.error(
    "[401] " + req.auth
      ? "Authorization Rejected"
      : "No authorization data" + " path: " + req.originalUrl
  );
  return {
    success: false,
    status: 401,
    data: req.auth ? "Authorization Rejected" : "No authorization data",
  };
};
