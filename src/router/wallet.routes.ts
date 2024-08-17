import express from "express";
import WalletController from "../controller/wallet.controller";
import { InputValidationMiddleware } from "../middleware/inputValidation.middleware";
import { InputBodyWalletValidation } from "../validations/wallet/InputBodyWallet.validator";

const router = express.Router();
/**
 * @openapi
 *   /wallet/{id}:
 *    get:
 *      security:
 *        - basicAuth: []
 *      summary: Метод Отримання Рахунку
 *      tags:
 *        - Wallet
 *      operationId: getWalletFromId
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
router.get("/:id", WalletController.getWalletFromId);

/**getAllWalets
 * @openapi
 *  '/wallet':
 *   get:
 *      security:
 *        - basicAuth: []
 *      summary: Метод Отримання списку Рахунків
 *      tags:
 *        - Wallet
 *      operationId: getAllWalets
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
router.get("/", WalletController.getAllWallets);

/**
 * @openapi
 *  /wallet:
 *    post:
 *      security:
 *        - basicAuth: []
 *      summary: Метод відкриття Рахунку
 *      tags:
 *        - Wallet
 *      operationId: newWallet
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WalletCreateModel'
 *
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
 */
router.post(
  "/",
  InputBodyWalletValidation,
  InputValidationMiddleware,
  WalletController.createWallet
);

/**updateWallet
 * @openapi
 *  /wallet:
 *    put:
 *      security:
 *        - basicAuth: []
 *      summary: Метод редагування
 *      tags:
 *        - Wallet
 *      operationId: editWallet
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WalletResponseModel'
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
router.put(
  "/:id",
  InputBodyWalletValidation,
  InputValidationMiddleware,
  WalletController.updateWallet
);

/**deleteWallet
 * @openapi
 *   /wallet/{id}:
 *    delete:
 *      security:
 *        - basicAuth: []
 *      summary: Метод видалення Рахунка
 *      tags:
 *        - Wallet
 *      operationId: deleteWallet
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
router.delete("/:id", WalletController.deleteWallet);

export default router;
