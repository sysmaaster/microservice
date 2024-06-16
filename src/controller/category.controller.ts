import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import ErrorException from "../exceptions/error.exception";
import { RequestWithBody, RequestWithParams } from "../types";
import log from "../services/logger.service";
import categoriesService from "../services/categories.service";
import { CategoriesResponseModel } from "../models/categoriesResponse.model";
import { CategoriesCreateModel } from "../models/categoriesCreate.model";
import { CategoriesEditRequestModel } from "../models/categoriesEditRequest.model";

class CategoriesController {
  async getAll(
    req: Request,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      let founds;
      founds = await categoriesService.getAll();
      if (founds) {
        res.status(HTTP_Status.OK_200).json(founds);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "getAll - CategoriesController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }

  async getFromId(
    req: RequestWithParams<{id:string}>,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      let found;
      if (!req.params) {
        res.sendStatus(HTTP_Status.BAD_REQUEST_400);
        return;
      }
      found = await categoriesService.getById(req.params.id);
      if (found) {
        res.status(HTTP_Status.OK_200).json(found);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "getFromId - CategoriesController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
  async create(
    req: RequestWithBody<CategoriesCreateModel>,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      const Wallet = await categoriesService.create(req.body);
      if (Wallet) {
        res.status(HTTP_Status.CREATED_201).json(Wallet);
      } else {
        res.sendStatus(HTTP_Status.BAD_REQUEST_400);
      }
    } catch (e) {
      log.error(e, "create - CategoriesController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
  async update(
    req: {body:CategoriesEditRequestModel, params: { id: string; }; },
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id
      const upd = await categoriesService.update(req.body, id);
      if (upd) {
        res.status(HTTP_Status.CREATED_201).json(upd);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "update - CategoriesController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }

  async delet(
    req: RequestWithParams<{id:string}>,
    res: Response<{}>,
    next: NextFunction
  ) {
    try {
      let foundcatg;
      foundcatg = await categoriesService.delete(req.params.id);
      if (foundcatg) {
        res.sendStatus(HTTP_Status.OK_200);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "delet - CategoriesController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
}

export default new CategoriesController();
