import { ObjectId } from "mongodb";
/**
 * @openapi
 * components:
 *  schemas:
 *    CategoriesEditRequestModel:
 *      type: object
 *      required:
 *        - id
 *        - C_NAME
 *      properties:
 *        id:
 *          type: string
 *        C_NAME:
 *          type: string
 *          example: testWallet
 *          minLength: 3
 *          maxLength: 30
 *        
 */
export type CategoriesEditRequestModel = {
  id: string;
  C_NAME: string;
};
