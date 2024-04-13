import basicAuth from "express-basic-auth";
import { getUnauthorizedResponse } from "../handler/unauthorizedResponse";

const BasicAuthMiddleware = basicAuth({
  users: {
    admin: "qwerty",
    sasa: "sasa",
  },
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse,
});
export default BasicAuthMiddleware;
