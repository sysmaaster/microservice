import { databaseResponseTimeHistogram } from "../services/metrics";
import db from "../schema/categories.schema";
import { CategoriesCreateModel } from "../models/categoriesCreate.model";
import { CategoriesEditRequestModel } from "../models/categoriesEditRequest.model";
import log from "../services/logger";
import ErrorException from "../exceptions/error.exception";
import getCrypto from "../utils/crypto.gen";

class CategoriesRepositry {
  async getAll() {
    const metricsLabels = {
      operation: "ShowAll Categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await db.find({});
      let filter = result.map((el)=>{return {id:el.id,name:el.name}}
      );
      timer({ ...metricsLabels, success: "true" });
      return filter;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      log.error(e, "getAll - CategoriesRepositry");
      return false;
    }
  }

  async getById(input: string) {
    const metricsLabels = {
      operation: "GetCategoriesById",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      let filter
      if (typeof input === 'string') {
        const result = await db.findOne({ id: input });
      if(result) filter =  {id:result.id,name:result.name}
      timer({ ...metricsLabels, success: "true" });
      return filter;
      } else {
        throw new ErrorException(400,"getById" ,"BAD REQEST")
      }
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      log.error(e, "getById - CategoriesRepositry");
      return false;
    }
  }

  async Create(input: CategoriesCreateModel) {
    const metricsLabels = {
      operation: "create categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      let filter
      let obj = {
        id: getCrypto(),
        name:input.name
      }
      const result = await db.create(obj);
      if(result) filter =  {id:result.id,name:result.name}
      timer({ ...metricsLabels, success: "true" });
      return filter;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      log.error(e, "Create - CategoriesRepositry");
      return false;
    }
  }

  async Update(upd: CategoriesEditRequestModel) {
    const metricsLabels = {
      operation: "Update categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      let filter
      const udp_data = {
        name: upd.name,
      };
      const result = await db.findOneAndUpdate(
        { id: upd.id },
        udp_data,
        {
          new: true,
        }
      );
      if(result) filter =  {id:result.id,name:result.name}
      timer({ ...metricsLabels, success: "true" });
      return filter;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      log.error(e, "Update - CategoriesRepositry");
      return false;
    }
  }

  async Delete(id: string) {
    const metricsLabels = {
      operation: "Delete categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await db.findOneAndDelete({ id });
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      log.error(e, "Delete - CategoriesRepositry");
      return false;
    }
  }
}
export default new CategoriesRepositry();
