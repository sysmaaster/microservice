import { ObjectId } from "mongodb";
/**
 * @openapi
 * components:
 *  schemas:
 *    CategoriesCreateModel:
 *      type: object
 *      required:
 *        - C_NAME
 *      properties:
 *        C_NAME:
 *          type: string
 *          example: testWallet
 *          minLength: 3
 *          maxLength: 30
 *        
 */

export type CategoriesCreateModel = {
  C_NAME: string;
 // HOVER: boolean;
};
