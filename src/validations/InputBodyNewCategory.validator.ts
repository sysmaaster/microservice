import { checkSchema } from "express-validator";

export const InputBodyNewCategoryValidation = checkSchema({
  name: {
    exists: {
      errorMessage: "Name required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Name, should be is String" },
    isLength: {
      options: { max: 30 },
      errorMessage: "Name, Length max 30",
    },
  },
});
/*    Post body == 
const a = {
  "name": "Категорія Витрат",
  "sortId": 15,
};
*/
