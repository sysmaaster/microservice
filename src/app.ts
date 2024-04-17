import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import responseTime from "response-time";
import swaggerDocs from "./services/swagger";
import DevsRouter from "./router/devs.routes";
import WalletRouter from "./router/wallet.routes";
import CategoriesRouter from "./router/categories.routes";
import errorMiddleware from "./middleware/error.middleware";
import errorLoggerHandler from "./handler/errorLogger.handler";
import { restResponseTimeHistogram } from "./services/metrics";
import invalidPathHandler from "./handler/invalidPath.handler";
import BasicAuthMiddleware from "./middleware/basicAuth.middleware";
import UploadRouter from "./router/upload.routes";

const port: string | number = process.env.PORT || 1242;

const app = express();

app.use(cors());
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({ extended: true }));

const _dirname = path.resolve(path.resolve(), "./public");
app.use(express.static(path.resolve(path.resolve(), "./public")));

app.set("view engine", "ejs"); // configure template engine
app.set("views", path.resolve(_dirname, "views")); // set express to look in this folder to render our view
app.use(
  responseTime(
    (request: express.Request, response: express.Response, time: number) => {
      if (request?.route?.path) {
        restResponseTimeHistogram.observe(
          {
            method: request.method,
            route: request.route.path,
            status_code: response.statusCode,
          },
          time * 1000
        );
      }
    }
  )
);

app.get("/healthcheck", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => {
  res.render("index", {
    title: "EMILL v6",
    text: " Працює - ОК",
  });
});
//app.use(BasicAuthMiddleware); //-- Auth

swaggerDocs(app, port);
app.use("/dev", DevsRouter());
app.use("/wallet", WalletRouter());
app.use("/categories", CategoriesRouter());
app.use("/upload", UploadRouter());

app.use(errorLoggerHandler); //-- ErrorException
app.use(errorMiddleware); //-- ErrorException

app.use(invalidPathHandler);

export default app;
