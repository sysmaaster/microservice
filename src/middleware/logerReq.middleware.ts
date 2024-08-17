import { Request, Response, NextFunction } from "express";
import log from "../services/logger.service";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const { method, url, body, params } = req;
  log.info(
    `[method: ${method}] [url: ${url}] 
     [body: ${JSON.stringify(body)}] 
     [params: ${JSON.stringify(params)}]`
  );
  next();
};

export default logRequest;
