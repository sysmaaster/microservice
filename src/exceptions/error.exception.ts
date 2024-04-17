class ErrorException extends Error {
  status: number;
  name: string;
  message: any;
  /**
   * @param status
   * @param name
   * @param message
   */
  constructor(status: number, name: string, message: any) {
    super(message);
    this.status = status;
    this.name = name;
    this.message = message;
    //this.stack = Error.captureStackTrace(this);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}

export default ErrorException;
