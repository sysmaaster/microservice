import ErrorException from "./error.exception";

class WalletException extends ErrorException {
  constructor() {
    super(400, "Wallet", `Bad Request`);
  }
}

export default WalletException;
