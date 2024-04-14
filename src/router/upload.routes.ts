import express from "express";
import { query } from "express-validator";
import DevsController from "../controller/devs.controller";
import { InputValidationMiddleware } from "../middleware/inputValidation.middleware";
import uploadController from "../controller/upload.controller";
 

const UploadRouter = () => {
  const router = express.Router();
  /**uploadPage
   * @openapi
   * /upload/file:
   *  get:
   *     tags:
   *     - UPLOAD
   *     description: res upload Page EJS
   *     responses:
   *       200:
   *         description: Page EJS
   */
  router.get("/file", uploadController.get);
  router.post("/upl", uploadController.upload);
  router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);
  router.delete("/files/:name", uploadController.remove);


  return router;
};

export default UploadRouter;
