/**
 * @openapi
 * components:
 *  schemas:
 *   CategoriesResponseModel:
 *    type: object
 *    required: 
 *     - id
 *     - C_NAME
 *    properties:
 *        id:
 *          type: string
 *        C_NAME:
 *          type: string
 *          example: testWallet
 *          minLength: 3
 *          maxLength: 30
 * 
 */

export type CategoriesResponseModel = {
    id: string;
    С_NAME: string;
  };