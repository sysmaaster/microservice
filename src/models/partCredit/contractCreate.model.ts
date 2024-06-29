export type ContractCreateModel = {
  c_name: string;
  c_owner: string;
  c_total: string;
  c_mount_payment: string;
  c_left: string;
  c_pay_date: string;
  c_part_total: number;
  c_part_left: number;
  c_ccy: string;
  c_close: boolean;
};
/*
const part = [
  {
    c_name: "*9736 АЛЛО",
    c_owner: "PB",
    c_total: "10999.00",
    c_mount_payment: "551.050",
    c_left: "5499.50",
    c_pay_date: "05.07.2024",
    c_part_total: 20,
    c_part_left: 10,
    c_ccy: "UAH",
    c_close: false,
  },
];
*/

/**@openapi
 *
 * components:
 *  schemas:
 *    ContractPartCreateModel:
 *      type: object
 *      required:
 *       - c_name
 *       - c_owner
 *       - c_total
 *       - c_mount_payment
 *       - c_left
 *       - c_pay_date
 *       - c_part_total
 *       - c_part_left
 *       - c_ccy
 *       - c_close
 *      properties:
 *        c_name:
 *          type: string
 *          example: name contract
 *          minLength: 3
 *          maxLength: 30
 *        c_owner:
 *          type: string
 *          example: owner in contract
 *          minLength: 3
 *          maxLength: 30
 *
 *
 *        c_ccy:
 *          type: string
 *          example: UAH
 *          enum:
 *            - "UAH"
 *            - "USD"
 *            - "EUR"
 *        c_close:
 *          type: boolean
 *          example: false
 */
