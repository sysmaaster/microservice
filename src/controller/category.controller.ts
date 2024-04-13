import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import ErrorException from "../exceptions/error.exception";
import { RequestWithParams } from "../types";
import log from "../services/logger";

class CategoriesController {
  async getAll(req: Request, res: Response) {
    res.status(HTTP_Status.OK_200).send(`a?`);
  }

  async deletCategor(req: RequestWithParams<string>, res: Response<{}>) {
    try {
      let results;
      // results = await walletService.deleteWallet(req.params[0])
      if (results) {
        res.status(HTTP_Status.OK_200).json({});
      }
    } catch (e) {
      log.error(e, "delete - CategorController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
}

export default new CategoriesController();
