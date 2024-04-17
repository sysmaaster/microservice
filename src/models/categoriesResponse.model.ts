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
 *          example: 53b1c579bdf3de74f76bdac9
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
