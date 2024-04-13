import wallet from "../schema/wallet.schema";
import { WalletCreateModel } from "../models/walletCreate.model";
import { databaseResponseTimeHistogram } from "../services/metrics";
import { WalletEditRequestModel } from "../models/walletEditRequest.model";

class WalletRepositry {

  async GetAll() {
    const metricsLabels = {
      operation: "ShowAll",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await wallet.find({});
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async GetById(input: string) {
    const metricsLabels = {
      operation: "GetWalletById",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await wallet.findOne({ _id: input });
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async Create(
    input: WalletCreateModel
  ) {
    const metricsLabels = {
      operation: "createWallet",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await wallet.create(input);
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async Update(upd: WalletEditRequestModel) {
    const metricsLabels = {
      operation: "Update",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const udp_data = {
        W_NAME: upd.W_NAME,
        W_COMMENT: upd.W_COMMENT,
        SUMMA: upd.SUMMA,
        LIMIT: upd.LIMIT,
        CCY: upd.CCY,
        TYPE: upd.TYPE,
        HOVER: upd.HOVER,
      };
      const result = await wallet.findOneAndUpdate({ _id: upd.id }, udp_data, {
        new: true,
      });
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async UpdateBal({
    id,
    amount,
  }: {
    id: string;
    amount: number;
  }) {
    const metricsLabels = {
      operation: "UpdateBal",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      let result = await wallet.findByIdAndUpdate(
        { _id: id },
        { SUMMA: amount },
        { new: true }
      );
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }
  
  /* async ShowAllSort({
     sort,
   }: {
     sort: "asc" | "desc";
   }): Promise<WalletResponseModel | {}> {
     const metricsLabels = {
       operation: "g",
     };
     const timer = databaseResponseTimeHistogram.startTimer();
     try {
       let sortType = {};
       if (sort === "asc") {
         sortType = { sortId: 1 };
       } else if (sort === "desc") {
         sortType = { sortId: -1 };
       }
       const result = await wallet.find({}).sort(sortType);
       timer({ ...metricsLabels, success: "true" });
       return result;
     } catch (e) {
       timer({ ...metricsLabels, success: "false" });
       throw e;
     }
   }*/

  async Delete(id: string) {
    const metricsLabels = {
      operation: "Delete",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await wallet.findByIdAndDelete({ _id: id });
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }
}
export default new WalletRepositry();