import ErrorException from "./error.exception";

class CategoriesException extends ErrorException {
  constructor() {
    super(400, "Categories", `Bad Request`);
  }
}

export default CategoriesException;
