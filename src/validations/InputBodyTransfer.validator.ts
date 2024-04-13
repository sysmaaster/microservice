import { checkSchema } from "express-validator";

export const InputBodyTransferValidation = checkSchema({
  DATE: {
    exists: {
      errorMessage: "date required",
      options: { checkFalsy: true },
    },
    isDate: {
      errorMessage: "date not valid",
      options: { format: "DD/MM/YYYY" },
    },
  },
  TYPE: {
    exists: { errorMessage: "type required" },
    isString: { errorMessage: "type, should be is String" },
    isIn: {
      options: [["DEBIT", "CREDIT"]],
      errorMessage: "type not is CREDIT or DEBIT",
    },
  },
  COUNT_A: {
    exists: {
      errorMessage: "sender_/_id required",
    },
    isString: { errorMessage: "sender_/_id, should be is String" },
  },
  COUNT_B: {
    exists: {
      errorMessage: "peer_/_id required",
    },
    isString: { errorMessage: "peer_/_id, should be is String" },
  },
  SUMMA: {
    exists: {
      errorMessage: "amount required",
    },
    isFloat: {
      options: { min: 0.01 },
      errorMessage: "amount, must be isFloat and >0.01",
    },
  },
  CCY: {
    exists: { errorMessage: "currency required" },
    isString: { errorMessage: "currency, should be is String" },
    isIn: {
      options: [["UAH", "USD"]],
      errorMessage: "currency not is UAH or USD",
    },
  },
  COMENT: {
    isString: { errorMessage: "notes, should be is String" },
    isLength: {
      options: { max: 30 },
      errorMessage: "tag, Length max 30",
    },
  },
});
/** Post body ==
{
  "DATE": "22/05/2021",
  "TYPE": '"DEBIT " | "CREDIT"',
  "COUNT_A": "650f1a96228354956926fe89", 
  "COUNT_B": "650f1a46228354956926fe87",
  "SUMMA": 1897.56,
  "CCY": "UAH",
  "COMENT": "Оплата за Інтернет",
}*/
