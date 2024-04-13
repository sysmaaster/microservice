import { checkSchema } from "express-validator";

export const InputBodyWalletValidation = checkSchema({
  W_NAME: {
    exists: {
      errorMessage: "wallName required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "wallName, should be is String" },
    isLength: {
      options: { max: 35 },
      errorMessage: "wallName, Length max 35",
    },
  },
  W_COMMENT: {
    exists: {
      errorMessage: "W_COMMENT required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "W_COMMENT, should be is String" },
    isLength: {
      options: { max: 20 },
      errorMessage: "W_COMMENT, Length max 20",
    },
  },
  SUMMA: {
    exists: {
      errorMessage: "bal required",
    },
    isFloat: {
      /*options: { min: 0 },*/
      errorMessage: "bal, must be isFloat" ,//and >0.01
    },
  },
  LIMIT: {
    exists: {
      errorMessage: "bal required",
    },
    isFloat: {
      /*options: { min: 0 },*/
      errorMessage: "bal, must be isFloat" ,//and >0.01
    },
  },
  CCY: {
    exists: { errorMessage: "currency required" },
    isString: { errorMessage: "currency, should be is String" },
    isIn: {
      options: [['UAH', 'USD', 'EUR' ]],
      errorMessage: "currency not is UAH or USD",
    },
  },
  TYPE: {
    exists: { errorMessage: "type required" },
    isString: { errorMessage: "type, should be is String" },
    isIn: {
      options: [["CARD", "DEPOSIT", "CREDIT"]],
      errorMessage: "type not is CREDIT, DEPOSIT or CARD",
    },
  },
  HOVER: {
    exists: {
      errorMessage: "W_HOVER required",
    },
    isBoolean: { errorMessage: "HOVER, should be Boolean" },
  },
});

/*    Post body == 
const a = {
  "W_NAME": "Золота Карта для Виплат",
    "W_COMMENT": "малооо",
    "SUMMA": 18997,
    "LIMIT": 100,
    "CCY": "USD",
    "TYPE": "CARD",
    "HOVER": false
}
const b = {
  "W_NAME": "Кредит ОО Є-Всім",
  "W_COMMENT": "горить",
  "SUMMA": -200,
  "LIMIT": 3000,
  "CCY": "UAH",
  "TYPE":"CREDIT",
  "HOVER": false
}*/
