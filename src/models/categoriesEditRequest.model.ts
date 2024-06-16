/**
 * @openapi
 * components:
 *  schemas:
 *    CategoriesEditRequestModel:
 *      type: object
 *      required:
 *        - id
 *        - name
 *      properties:
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
export type CategoriesEditRequestModel = {
  id: string;
  name: string;
};
