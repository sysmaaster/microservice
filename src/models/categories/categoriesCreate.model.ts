
/**
 * @openapi
 * components:
 *  schemas:
 *    CategoriesCreateModel:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          example: testCategories
 *          minLength: 3
 *          maxLength: 30
 *
 */

export type CategoriesCreateModel = {
  name: string;
  // HOVER: boolean;
};
