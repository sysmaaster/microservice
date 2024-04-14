import { ObjectId } from "mongodb";
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
