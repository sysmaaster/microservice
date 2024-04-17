import { CategoriesCreateModel } from "../models/categoriesCreate.model";
import { CategoriesEditRequestModel } from "../models/categoriesEditRequest.model";
import { CategoriesResponseModel } from "../models/categoriesResponse.model";
import repo from "../repositories/categories.repositories";
class CategoriesService {
  async getAll(): Promise<CategoriesResponseModel | {} | false> {
    let result;
    result = await repo.getAll();
    if (result) return result;
    return false;
  }

  async getById(id: string): Promise<CategoriesResponseModel | {} | false> {
    let result;
    result = await repo.getById(id);
    if (result) return result;
    return false;
  }

  async create(
    newCatg: CategoriesCreateModel
  ): Promise<CategoriesResponseModel | {} | false> {
    let result;
    result = await repo.Create(newCatg);
    if (result) return result;
    return false;
  }

  async update(
    updCatg: CategoriesEditRequestModel
  ): Promise<CategoriesResponseModel | {} | false> {
    let result;
    result = await repo.Update(updCatg);
    if (result) return result;
    return false;
  }

  async delete(id: string): Promise<boolean> {
    if (!id) return false;
    let result;
    result = await repo.Delete(id);
    if (result) return true;
    return false;
  }
}

export default new CategoriesService();
