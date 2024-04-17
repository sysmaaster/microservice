import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import ErrorException from "../exceptions/error.exception";

class DevsController {
 
  help(req: Request, res: Response) {
      try {
      res.render("help", {
        title: "EMILL v6",
        text: " EMILL v6 Цей сервіс DEV-6 (API) створено 27.08.2023"
        +" в розробці до 30.10.2023"
        +" продовжено 01.01.2024"
        +" Сервіс Категорій Допрацьвано 14.04.2024"
        +"",
      });
    } catch (e) {
      res.status(HTTP_Status.Server_Error_500);
    }
  }
  
  hello(req: Request, res: Response) {
    res.status(HTTP_Status.OK_200).send(`Hello`);
  }

  test(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(HTTP_Status.OK_200)
        .send(" EMILL v6 Цей сервіс DEV-6 (API) створено 27.08.2023 в розробці до 30.10.2023 <br> продовжено 01.01.2024 Сервіс Категорій Допрацьвано 14.04.2024");
    } catch (e) {
      new ErrorException(500, "test", "its BAAD");
    }
  }
}

export default new DevsController();
