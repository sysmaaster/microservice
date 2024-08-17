import express from "express";
import ContractController from "../controller/contract.controller";
import { InputValidationMiddleware } from "../middleware/inputValidation.middleware";

const router = express.Router();

/**
 * @openapi
 *   /part/{id}:
 *    get:
 *      security:
 *        - basicAuth: []
 *      summary: Метод Отримання Рахунку
 *      tags:
 *        - ContractPart
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
router.get("/:id", ContractController.getFromId);

/**getAllContractPart
 * @openapi
 *  '/part':
 *   get:
 *      security:
 *        - basicAuth: []
 *      summary: Метод Отримання списку Категорій
 *      tags:
 *        - ContractPart
 *      operationId: getAllContractPart
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
router.get("/", ContractController.getAll);

/**newContractPart
 * @openapi
 *  /part:
 *    post:
 *      security:
 *        - basicAuth: []
 *      summary: Метод додавання категорії
 *      tags:
 *        - ContractPart
 *      operationId: newContractPart
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
  ContractController.create
);

/**editContract
 * @openapi
 *  /part:
 *    put:
 *      security:
 *        - basicAuth: []
 *      summary: Метод редагування
 *      tags:
 *        - ContractPart
 *      operationId: editContractPart
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
  ContractController.update
);

/**deleteContract
 * @openapi
 *   /part/{id}:
 *    delete:
 *      security:
 *        - basicAuth: []
 *      summary: Метод видалення Категорії
 *      tags:
 *        - ContractPart
 *      operationId: deleteContractPart
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
router.delete(/^\/(?:([^\/]+?))\/?$/i, ContractController.delet);

export default router;
