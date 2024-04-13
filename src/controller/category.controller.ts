import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import ErrorException from "../exceptions/error.exception";
import { RequestWithBody, RequestWithParams } from "../types";
import log from "../services/logger";
import categoriesService from "../services/categories.service";
import { CategoriesResponseModel } from "../models/categoriesResponse.model";
import { CategoriesCreateModel } from "../models/categoriesCreate.model";
import { CategoriesEditRequestModel } from "../models/categoriesEditRequest.model";
import WalletException from "../exceptions/wallet.exception";

class CategoriesController {
  async getAll(
    req: Request,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    let founds;
    founds = await categoriesService.getAll().catch((err) => {
      log.error(err, "getAll - CategoryController");
      next(new ErrorException(500, err.name, err.message));
    });
    if (founds) {
      res.status(HTTP_Status.OK_200).json(founds);
    } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
  }

  async getFromId(
    req: RequestWithParams<string>,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    let found;
    if (!req.params) {
      res.sendStatus(HTTP_Status.BAD_REQUEST_400);
      return;
    }
    found = await categoriesService.getById(req.params[0]).catch((err) => {
      log.error(err, "getById - CategoryController");
      next(new ErrorException(500, err.name, err.message));
    });
    if (found) {
      res.status(HTTP_Status.OK_200).json(found);
    } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
  }
  async create(
    req: RequestWithBody<CategoriesCreateModel>,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    const Wallet = await categoriesService.create(req.body).catch((err) => {
      new WalletException( err.name) ;
      log.error(err, "create - CategoryController");
    });
    if (Wallet) {
      res.status(HTTP_Status.CREATED_201).json(Wallet);
    } else{ res.sendStatus(HTTP_Status.BAD_REQUEST_400)};
  }
  async update(
    req: RequestWithBody<CategoriesEditRequestModel>,
    res: Response<CategoriesResponseModel | {}>,
    next: NextFunction
  ) {
    const upd = await categoriesService.update(req.body).catch((err) => {
      log.error(err, "update - CategoryController");
      next(new ErrorException(500, err.name, err.message));
    });
    if (upd) {
      res.status(HTTP_Status.CREATED_201).json(upd);
    } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
  }

  async delet(
    req: RequestWithParams<string>,
    res: Response<{}>,
    next: NextFunction
  ) {
    let foundcatg;
    foundcatg = await categoriesService.delete(req.params[0]).catch((err) => {
      log.error(err, "delete - CategoryController");
      next(new ErrorException(500, err.name, err.message));
    });
    if (foundcatg) {
      res.sendStatus(HTTP_Status.OK_200);
    } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
  }
}

export default new CategoriesController();
