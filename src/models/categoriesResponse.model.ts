/**
 * @openapi
 * components:
 *  schemas:
 *   CategoriesResponseModel:
 *    type: object
 *    required: 
 *     - id
 *     - name
 *    properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *          example: testWallet
 *          minLength: 3
 *          maxLength: 30
 * 
 */

export type CategoriesResponseModel = {
    id: string;
    name: string;
  };