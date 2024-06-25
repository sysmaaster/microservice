import express from "express";
import PartCreditController from "../controller/partcredit.controller";
import { InputValidationMiddleware } from "../middleware/inputValidation.middleware";

const PartCreditRouter = () => {
  const router = express.Router();

  /**
   * @openapi
   *   /part/{id}:
   *    get:
   *      security:
   *        - basicAuth: []
   *      summary: Метод Отримання Рахунку
   *      tags:
   *        - PartCredit
   *      operationId: getCreditFromId
   *      parameters:
   *        - name: id
   *          in: path
   *          required: true
   *          description: Ідентифікатор Рахунку
   *          schema:
   *            type: string
   *          example: 53b1c579bdf3de74f76bdac9
   *      responses:
   *        "200":
   *          description: Успіх
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/WalletResponseModel'
   *        "401":
   *          description: Інформація для автентифікації відсутня або недійсна
   *        "default":
   *          description: Все нестандартне
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ErrorResponseModel'
   *
   */
  router.get("/:id", PartCreditController.getFromId);

  /**getAllPartCredit
   * @openapi
   *  '/part':
   *   get:
   *      security:
   *        - basicAuth: []
   *      summary: Метод Отримання списку Категорій
   *      tags:
   *        - PartCredit
   *      operationId: getAllPartCredit
   *      responses:
   *        "200":
   *          description: Успіх
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CategoriesResponseModel'
   *        "401":
   *          description: Інформація для автентифікації відсутня або недійсна
   *        "default":
   *          description: Все нестандартне
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ErrorResponseModel'
   *
   */
  router.get("/", PartCreditController.getAll);

  /**newPartCredit
   * @openapi
   *  /part:
   *    post:
   *      security:
   *        - basicAuth: []
   *      summary: Метод додавання категорії
   *      tags:
   *        - PartCredit
   *      operationId: newPartCredit
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CategoriesCreateModel'
   *
   *      responses:
   *        "200":
   *          description: Успіх
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CategoriesResponseModel'
   *        "401":
   *          description: Інформація для автентифікації відсутня або недійсна
   *        "default":
   *          description: Все нестандартне
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ErrorResponseModel'
   */
  router.post(
    "/",
    //InputBodyNewCategoryValidation,*************rechange
    InputValidationMiddleware,
    PartCreditController.create
  );

  /**editCategory
   * @openapi
   *  /part:
   *    put:
   *      security:
   *        - basicAuth: []
   *      summary: Метод редагування
   *      tags:
   *        - PartCredit
   *      operationId: editPartCredit
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CategoriesEditRequestModel'
   *      responses:
   *        "200":
   *          description: Успіх
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CategoriesResponseModel'
   *        "401":
   *          description: Інформація для автентифікації відсутня або недійсна
   *        "default":
   *          description: Все нестандартне
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ErrorResponseModel'
   *
   */
  router.put(
    "/",
    //InputBodyEditCategoryValidation,,*************rechange
    InputValidationMiddleware,
    PartCreditController.update
  );

  /**deleteCategory
   * @openapi
   *   /part/{id}:
   *    delete:
   *      security:
   *        - basicAuth: []
   *      summary: Метод видалення Категорії
   *      tags:
   *        - PartCredit
   *      operationId: deletePartCredit
   *      responses:
   *        "200":
   *          description: Успішно видалено
   *          content:
   *            application/json: {}
   *        "401":
   *          description: Інформація для автентифікації відсутня або недійсна
   *        "default":
   *          description: Все нестандартне
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/ErrorResponseModel'
   *      parameters:
   *        - name: id
   *          in: path
   *          required: true
   *          description: Ідентифікатор Рахунку
   *          schema:
   *            type: string
   *          example: 53b1c579bdf3de74f76bdac9
   *
   */
  router.delete(/^\/(?:([^\/]+?))\/?$/i, PartCreditController.delet);

  return router;
};

export default PartCreditRouter;
