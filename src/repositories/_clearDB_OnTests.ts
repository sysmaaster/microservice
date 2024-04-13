import wallet from "../schema/wallet.schema";

/**
 * @returns WalletResponseModel
 */

const _clearDB_OnTests = () => {
  return wallet.deleteMany();
};
export default _clearDB_OnTests;
