export type WalletResponseModel = {
  id: string;
  W_NAME: string;
  W_COMMENT: string;
  SUMMA: number;
  LIMIT: number;
  CCY: string;
  TYPE: string;
  HOVER: boolean;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    WalletResponseModel:
 *      type: object
 *      required:
 *        - id
 *        - W_NAME
 *        - W_COMMENT
 *        - SUMMA
 *        - LIMIT
 *        - CCY
 *        - TYPE
 *        - HOVER
 *      properties:
 *        id:
 *          type: string
 *          example: 53b1c579bdf3de74f76bdac9
 *        W_NAME:
 *          type: string
 *          example: testWallet
 *          minLength: 3
 *          maxLength: 30
 *        W_COMMENT:
 *          type: string
 *          example: testComment
 *          minLength: 3
 *          maxLength: 30
 *        SUMMA:
 *          default: 0.00
 *          type: number
 *          format: float
 *        LIMIT:
 *          example: 0.00
 *          type: number
 *          format: float
 *        CCY:
 *          type: string
 *          example: UAH
 *          enum:
 *            - "UAH"
 *            - "USD"
 *            - "EUR"
 *        TYPE:
 *          type: string
 *          example: CARD
 *          enum:
 *           - "CARD"
 *           - "DEBIT"
 *           - "CREDIT"
 *        HOVER:
 *          type: boolean
 *          example: false
 */
