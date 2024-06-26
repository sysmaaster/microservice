import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import { RequestWithBody, RequestWithParams } from "../types";
import log from "../services/logger.service";
import PartCreditService from "../services/partcredit.service";

class PartCreditController {
  async getAll(
    req: Request,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      let founds;
      founds = await PartCreditService.getAll();
      if (founds) {
        res.status(HTTP_Status.OK_200).json(founds);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "getAll - PartCreditController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }

  async getFromId(
    req: RequestWithParams<{ id: string }>,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      let found;
      if (!req.params) {
        res.sendStatus(HTTP_Status.BAD_REQUEST_400);
        return;
      }
      found = await PartCreditService.getById(req.params.id);
      if (found) {
        res.status(HTTP_Status.OK_200).json(found);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "getFromId - PartCreditController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
  async create(
    req: RequestWithBody<CategoriesCreateModel>,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      const Wallet = await PartCreditService.create(req.body);
      if (Wallet) {
        res.status(HTTP_Status.CREATED_201).json(Wallet);
      } else {
        res.sendStatus(HTTP_Status.BAD_REQUEST_400);
      }
    } catch (e) {
      log.error(e, "create - PartCreditController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
  async update(
    req: { body: CategoriesEditRequestModel; params: { id: string } },
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const upd = await PartCreditService.update(req.body, id);
      if (upd) {
        res.status(HTTP_Status.CREATED_201).json(upd);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "update - PartCreditController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }

  async delet(
    req: RequestWithParams<{ id: string }>,
    res: Response<{}>,
    next: NextFunction
  ) {
    try {
      let foundcatg;
      foundcatg = await PartCreditService.delete(req.params.id);
      if (foundcatg) {
        res.sendStatus(HTTP_Status.OK_200);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "delet - PartCreditController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
}

export default new PartCreditController();