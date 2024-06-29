import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, index: true, unique: true },
    c_name: { type: String, required: true },
    c_owner: { type: String, required: true },
    c_total: { type: String, required: true },
    c_mount_payment: { type: String, required: true },
    c_left: { type: String, required: true },
    c_pay_date: { type: String, required: true },
    c_part_total: { type: Number, required: true },
    c_part_left: { type: Number, required: true },
    c_ccy: {
      type: String,
      required: true,
      enum: {
        values: ["UAH", "USD", "EUR"],
        message: "{VALUE} is not supported CCY",
      },
    },
    c_close: { type: Boolean, require: true },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "contract",
    versionKey: false,
  }
);
/*  
    c_name: "*9736 РОЗЕТКА",
    c_owner: "PB",
    c_total: "10999.00",
    c_mount_payment: "551.050",
    c_left: "5499.50",
    c_pay_date: "05.07.2024",
    c_part_total: 20,
    c_part_left: 10,
    c_ccy: "UAH",
    c_close: false,

 */
export default mongoose.model("contract", ContractSchema);
