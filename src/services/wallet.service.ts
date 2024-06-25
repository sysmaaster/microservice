import { WalletCreateModel } from "../models/wallet/walletCreate.model";
import { WalletEditRequestModel } from "../models/wallet/walletEditRequest.model";
import { WalletResponseModel } from "../models/wallet/walletResponse.model";
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
    updWallet: WalletEditRequestModel,
    id: string
  ): Promise<WalletResponseModel | {} | false> {
    let result;
    result = await Wallet.Update(updWallet, id);
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
