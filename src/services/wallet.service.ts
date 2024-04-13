
import { WalletCreateModel } from "../models/walletCreate.model";
import { WalletEditRequestModel } from "../models/walletEditRequest.model";
import { WalletResponseModel } from "../models/walletResponse.model";
import Wallet from "../repositories/wallet.repositories";

class WalletService {
    /**getAllWallets
     * 
     * @returns WalletResponseModel|{}|false
     */
    async getAllWallets(): Promise<WalletResponseModel | {} | false> {
        let result;
        result = await Wallet.GetAll()
        if (result) return result
        return false
    }
    /**getWalletFromId
     * 
     * @param id : string
     * @returns WalletResponseModel|{}|false
     */
    async getWalletFromId(id: string): Promise<WalletResponseModel | {} | false> {
        if (!id) return false
        let result;
        result = await Wallet.GetById(id)
        if (result) return result
        return false
    }
    /**createWallet
     * 
     * @param newWallet : WalletCreateModel
     * @returns WalletResponseModel|{}|false
     */
    async createWallet(newWallet: WalletCreateModel): Promise<WalletResponseModel | {} | false> {
        let result;
        result = await Wallet.Create(newWallet)
        if (result) return result
        return false
    }
    /**updateWallet
     * 
     * @param updWallet : WalletEditRequestModel
     * @returns WalletResponseModel|{}|false
     */
    async updateWallet(updWallet: WalletEditRequestModel): Promise<WalletResponseModel | {} | false> {
        let result
        result = await Wallet.Update(updWallet)
        if (result) return result;
        return false
    }
    /**deleteWallet
     * 
     * @param id : string
     * @returns boolean
     */
    async deleteWallet(id: string): Promise<boolean> {
        if (!id) return false
        let result;
        result = await Wallet.Delete(id)
        if (result) return true
        return false
    }
}
export default new WalletService();
