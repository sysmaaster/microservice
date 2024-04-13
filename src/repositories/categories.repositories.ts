import { databaseResponseTimeHistogram } from "../services/metrics";
import categories from "../schema/categories.schema";
import { CategoriesCreateModel } from "../models/categoriesCreate.model";
import { CategoriesEditRequestModel } from "../models/categoriesEditRequest.model";

class CategoriesRepositry {

  async GetAll() {
    const metricsLabels = {
      operation: "ShowAll Categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await categories.find({});
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async GetById(input: string) {
    const metricsLabels = {
      operation: "GetCategoriesById",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await categories.findOne({ id: input });
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async Create(
    input: CategoriesCreateModel
  ) {
    const metricsLabels = {
      operation: "create categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await categories.create(input);
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async Update(upd: CategoriesEditRequestModel) {
    const metricsLabels = {
      operation: "Update categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const udp_data = {
        C_NAME: upd.C_NAME,
      };
      const result = await categories.findOneAndUpdate({ id: upd.id }, udp_data, {
        new: true,
      });
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async Delete(id: string) {
    const metricsLabels = {
      operation: "Delete categories",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await categories.findByIdAndDelete({ _id: id });
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }
}
export default new CategoriesRepositry();