import ErrorException from "./error.exception";

class WalletException extends ErrorException {
  /**
   * @param request
   * @param func
   */
  constructor( func: string) {
    super(
      400,
      "Wallet",
      `with Request  not found on function [${func}]`
    );
  }
}

export default WalletException;
