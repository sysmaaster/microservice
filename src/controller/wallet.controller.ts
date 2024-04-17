import { Response, NextFunction } from "express";
import { HTTP_Status } from "../utils/HTTP_Status";
import ErrorException from "../exceptions/error.exception";
import { WalletResponseModel } from "../models/walletResponse.model";
import { RequestWithBody, RequestWithParams, RequestWithQuery } from "../types";
import walletService from "../services/wallet.service";
import log from "../services/logger";
import { WalletEditRequestModel } from "../models/walletEditRequest.model";

class WalletController {
  async getAllWallets(
    req: any,
    res: Response<WalletResponseModel | {}>,
    next: NextFunction
  ) {
    try {
      let foundWallets;
    foundWallets = await walletService.getAllWallets()
    if (foundWallets) {
      res.status(HTTP_Status.OK_200).json(foundWallets);
    } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
  } catch (e) {
    log.error(e, "getAllWallets - WalletController");
    res.sendStatus(HTTP_Status.Server_Error_500);
  }
  }

  async getWalletFromId(
    req: RequestWithParams<string>,
    res: Response<WalletResponseModel | {}>,
    next: NextFunction
  ) {
    try {
    let foundWallet;
    if (!req.params) {
      res.sendStatus(HTTP_Status.BAD_REQUEST_400);
      return;
    }
    foundWallet = await walletService
      .getWalletFromId(req.params[0])
    if (foundWallet) {
      res.status(HTTP_Status.OK_200).json(foundWallet);
    } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
  } catch (e) {
    log.error(e, "getWalletFromId - WalletController");
    res.sendStatus(HTTP_Status.Server_Error_500);
  }
  }

  async createWallet(
    req: RequestWithBody<WalletResponseModel>,
    res: Response<WalletResponseModel | {}>,
    next: NextFunction
  ) {
    try {
    const Wallet = await walletService.createWallet(req.body)
    if (Wallet) {
      res.status(HTTP_Status.CREATED_201).json(Wallet);
    } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
  } catch (e) {
    log.error(e, "createWallet - WalletController");
    res.sendStatus(HTTP_Status.Server_Error_500);
  }
  }

  async updateWallet(
    req: RequestWithBody<WalletEditRequestModel>,
    res: Response<WalletResponseModel | {}>
  ) {
    try {
      const Wallet = await walletService.updateWallet(req.body);
      if (Wallet) {
        res.status(HTTP_Status.CREATED_201).json(Wallet);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "updateWallet  - WalletController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }

  async deleteWallet(req: RequestWithParams<string>, res: Response<{}>) {
    try {
      let foundWallet;
      foundWallet = await walletService.deleteWallet(req.params[0]);
      if (foundWallet) {
        res.sendStatus(HTTP_Status.OK_200);
      } else res.sendStatus(HTTP_Status.BAD_REQUEST_400);
    } catch (e) {
      log.error(e, "delete - WalletController");
      res.sendStatus(HTTP_Status.Server_Error_500);
    }
  }
}
export default new WalletController();
