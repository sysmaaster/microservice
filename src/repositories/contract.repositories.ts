import { databaseResponseTimeHistogram } from "../services/metrics.service";
import { ContractCreateModel } from "../models/partCredit/contractCreate.model";
import { ContractEditRequestModel } from "../models/partCredit/contractEditRequest.model";
import DB from "../schema/contract.schema";

class ContractRepositry {
  async getAll() {
    const metricsLabels = {
      operation: "ShowAll Contract",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      /**
       *
       */
      timer({ ...metricsLabels, success: "true" });
      return false;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async getById(id: string) {
    const metricsLabels = {
      operation: "getById Contract",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      /**
       *
       */
      timer({ ...metricsLabels, success: "true" });
      return false;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async create(newContract: ContractCreateModel) {
    const metricsLabels = {
      operation: "create Contract",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      /**
       *
       */
      timer({ ...metricsLabels, success: "true" });
      return false;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async update(updContract: ContractEditRequestModel, id: string) {
    const metricsLabels = {
      operation: "update Contract",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      /**
       *
       */
      timer({ ...metricsLabels, success: "true" });
      return false;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

  async delete(id: string) {
    const metricsLabels = {
      operation: " Contract",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      /**
       *
       */
      timer({ ...metricsLabels, success: "true" });
      return false;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }
}

export default new ContractRepositry();
