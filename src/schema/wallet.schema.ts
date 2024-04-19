import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: true, unique: true },
    W_NAME: { type: String, required: true },
    W_COMMENT: { type: String, required: true },
    SUMMA: { type: Number, required: true },
    LIMIT: { type: Number, required: true },
    CCY: {
      type: String,
      required: true,
      enum: {
        values: ["UAH", "USD", "EUR"],
        message: "{VALUE} is not supported CCY",
      },
    },
    TYPE: {
      type: String,
      required: true,
      enum: {
        values: ["CARD", "CREDIT", "DEPOSIT"],
        message: "{VALUE} is not supported TYPE",
      },
    },
    HOVER: { type: Boolean, require: true },
  },
  {
    collection: "wallets",
    versionKey: false,
  }
);

export default mongoose.model("wallet", WalletSchema);

/*
{
  "W_NAME": "test Золота Карта для Виплат",
    "W_COMMENT": "малооо",
    "SUMMA": 1897,
    "LIMIT": 0,
    "CCY": "UAH",
    "TYPE": "CARD",
    "HOVER":false
}
 */
