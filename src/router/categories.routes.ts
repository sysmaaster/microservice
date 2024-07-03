import express from "express";
import CategoryController from "../controller/category.controller";
import { InputValidationMiddleware } from "../middleware/inputValidation.middleware";
import { InputBodyNewCategoryValidation } from "../validations/category/InputBodyNewCategory.validator";
import { InputBodyEditCategoryValidation } from "../validations/category/InputBodyEditCategory.validator";

const router = express.Router();

/**getAllCategories
 * @openapi
 *  '/categories':
 *   get:
 *      security:
 *        - basicAuth: []
 *      summary: Метод Отримання списку Категорій
 *      tags:
 *        - Categories
 *      operationId: getAllCategories
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
router.get("/", CategoryController.getAll);

/**newCategories
 * @openapi
 *  /categories:
 *    post:
 *      security:
 *        - basicAuth: []
 *      summary: Метод додавання категорії
 *      tags:
 *        - Categories
 *      operationId: newCategories
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
  InputBodyNewCategoryValidation,
  InputValidationMiddleware,
  CategoryController.create
);

/**editCategory
 * @openapi
 *  /categories:
 *    put:
 *      security:
 *        - basicAuth: []
 *      summary: Метод редагування
 *      tags:
 *        - Categories
 *      operationId: editCategory
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
  InputBodyEditCategoryValidation,
  InputValidationMiddleware,
  CategoryController.update
);

/**deleteCategory
 * @openapi
 *   /categories/{id}:
 *    delete:
 *      security:
 *        - basicAuth: []
 *      summary: Метод видалення Категорії
 *      tags:
 *        - Categories
 *      operationId: deleteCategory
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
router.delete(/^\/(?:([^\/]+?))\/?$/i, CategoryController.delet);

export default router;
