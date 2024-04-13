import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import ErrorException from "../exceptions/error.exception";

class DevsController {
 
  help(req: Request, res: Response) {
    res
      .status(HTTP_Status.OK_200)
      .send(`Цей сервіс DEV-5 (API) створено 27.08.2023`);
    /*try {
      res.render("./ejs/index", {
        title: "EMILL DEV-v5",
        text: "Цей сервіс DEV-5 (API) створено 27.08.2023",
      });
    } catch (e) {
      res.status(HTTP_Status.Server_Error_500);
    }*/
  }
  
  hello(req: Request, res: Response) {
    res.status(HTTP_Status.OK_200).send(`Hello`);
  }

  test(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(HTTP_Status.OK_200)
        .send(" EMILL DEV-v5 Цей сервіс DEV-5 (API) створено 27.08.2023");
    } catch (e) {
      new ErrorException(500, "test", "its BAAD");
    }
  }
}

export default new DevsController();
