/**
 * @openapi
 *components:
 *  schemas:
 *    ErrorResponseModel:
 *      type: object
 *      required:
 *        - success
 *        - status
 *        - data
 *      properties:
 *        success:
 *          type: boolean
 *        status:
 *          type: number
 *          example: 500
 *        data:
 *          type:  object
 *          required:
 *            - errors
 *          properties:
 *            errors:
 *              type: string
 *              example: something is wrong
 */
export type ErrorResponseModel = {
  success: boolean;
  status: number;
  data: {};
};
