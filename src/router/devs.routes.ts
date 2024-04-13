import express from "express";
import { query } from "express-validator";
import DevsController from "../controller/devs.controller";
import { InputValidationMiddleware } from "../middleware/inputValidation.middleware";
 
/**healthcheck
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
const DevsRouter = () => {
  const router = express.Router();
  /**help
   * @openapi
   * /dev/help:
   *  get:
   *     tags:
   *     - DEV
   *     description: As Created Date request
   *     responses:
   *       200:
   *         description: info on create api-s
   */
  router.get("/help", DevsController.help);

  /**hello
   * @openapi
   * /dev/hello:
   *  get:
   *     tags:
   *     - DEV
   *     description: Responds if the app is up  response say Hello
   *     responses:
   *       400:
   *         description: 400 is Good =)
   */
  router.get(
    "/hello",
    query("person").notEmpty().escape(),
    InputValidationMiddleware,
    DevsController.hello
  );

  /**test
   * @openapi
   * /dev/test:
   *  get:
   *     tags:
   *     - DEV
   *     description: Responds if the app is up  response say Hello
   *     responses:
   *       200:
   *         description: test
   */
  router.get("/test", DevsController.test);

  return router;
};

export default DevsRouter;
