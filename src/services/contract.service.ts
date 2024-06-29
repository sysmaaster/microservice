import { ContractCreateModel } from "../models/contractPart/contractCreate.model";
import { ContractEditRequestModel } from "../models/contractPart/contractEditRequest.model";
import { ContractResponseModel } from "../models/contractPart/contractResponse.model";
import repo from "../repositories/contract.repositories";
class ContractService {
  async getAll(): Promise<ContractResponseModel | {} | false> {
    let result;
    result = await repo.getAll();
    if (result) return result;
    return false;
  }

  async getById(id: string): Promise<ContractResponseModel | {} | false> {
    let result;
    result = await repo.getById(id);
    if (result) return result;
    return false;
  }

  async create(
    newContract: ContractCreateModel
  ): Promise<ContractResponseModel | {} | false> {
    let result;
    result = await repo.create(newContract);
    if (result) return result;
    return false;
  }

  async update(
    updContract: ContractEditRequestModel,
    id: string
  ): Promise<ContractResponseModel | {} | false> {
    let result;
    result = await repo.update(updContract, id);
    if (result) return result;
    return false;
  }

  async delete(id: string): Promise<boolean> {
    if (!id) return false;
    let result;
    result = await repo.delete(id);
    if (result) return true;
    return false;
  }
}

export default new ContractService();
