import { checkSchema } from "express-validator";

export const InputBodyEditCategoryValidation = checkSchema({
 /* id: {
    exists: {
      errorMessage: "id required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "id, should be is String" },
  },*/
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
