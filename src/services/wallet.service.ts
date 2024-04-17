import { WalletCreateModel } from "../models/walletCreate.model";
import { WalletEditRequestModel } from "../models/walletEditRequest.model";
import { WalletResponseModel } from "../models/walletResponse.model";
import Wallet from "../repositories/wallet.repositories";

class WalletService {
  async getAllWallets(): Promise<WalletResponseModel | {} | false> {
    let result;
    result = await Wallet.GetAll();
    if (result) return result;
    return false;
  }

  async getWalletFromId(id: string): Promise<WalletResponseModel | {} | false> {
    if (!id) return false;
    let result;
    result = await Wallet.GetById(id);
    if (result) return result;
    return false;
  }

  async createWallet(
    newWallet: WalletCreateModel
  ): Promise<WalletResponseModel | {} | false> {
    let result;
    result = await Wallet.Create(newWallet);
    if (result) return result;
    return false;
  }

  async updateWallet(
    updWallet: WalletEditRequestModel
  ): Promise<WalletResponseModel | {} | false> {
    let result;
    result = await Wallet.Update(updWallet);
    if (result) return result;
    return false;
  }

  async deleteWallet(id: string): Promise<boolean> {
    if (!id) return false;
    let result;
    result = await Wallet.Delete(id);
    if (result) return true;
    return false;
  }
}
export default new WalletService();
