import crypto from "crypto";
import ErrorException from "../exceptions/error.exception";

/**
 * functiion generic rendon string
 * @returns random string
 */
const getCrypto = (): string => {
  return crypto.randomBytes(12).toString("hex");
};
export default getCrypto;
