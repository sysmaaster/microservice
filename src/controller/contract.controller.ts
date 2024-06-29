import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import { RequestWithBody, RequestWithParams } from "../types";
import log from "../services/logger.service";
import ContractService from "../services/contract.service";

class ContractController {
  async getAll(req: Request, res: Response<any | {}>, next: NextFunction) {
    try {
      let founds;
      founds = await ContractService.getAll();
      if (founds) {
        res.status(HTTP_Status.OK_200).json(founds);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "getAll - ContractController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }

  async getFromId(
    req: RequestWithParams<{ id: string }>,
    res: Response<any | {}>,
    next: NextFunction
  ) {
    try {
      let found;
      if (!req.params) {
        res.sendStatus(HTTP_Status.BAD_REQUEST_400);
        return;
      }
      found = await ContractService.getById(req.params.id);
      if (found) {
        res.status(HTTP_Status.OK_200).json(found);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "getFromId - ContractController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
  async create(
    req: RequestWithBody<any>,
    res: Response<any | {}>,
    next: NextFunction
  ) {
    try {
      const Wallet = await ContractService.create(req.body);
      if (Wallet) {
        res.status(HTTP_Status.CREATED_201).json(Wallet);
      } else {
        res.sendStatus(HTTP_Status.BAD_REQUEST_400);
      }
    } catch (e) {
      log.error(e, "create - ContractController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
  async update(
    req: { body: any; params: { id: string } },
    res: Response<any | {}>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const upd = await ContractService.update(req.body, id);
      if (upd) {
        res.status(HTTP_Status.CREATED_201).json(upd);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "update - ContractController");
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
      foundcatg = await ContractService.delete(req.params.id);
      if (foundcatg) {
        res.sendStatus(HTTP_Status.OK_200);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "delet - ContractController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
}

export default new ContractController();
