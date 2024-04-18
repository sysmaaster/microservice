import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import responseTime from "response-time";
import swaggerDocs from "./services/swagger";
import DevsRouter from "./router/devs.routes";
import UploadRouter from "./router/upload.routes";
import WalletRouter from "./router/wallet.routes";
import CategoriesRouter from "./router/categories.routes";
import errorMiddleware from "./middleware/error.middleware";
import errorLoggerHandler from "./handler/errorLogger.handler";
import { restResponseTimeHistogram } from "./services/metrics";
import invalidPathHandler from "./handler/invalidPath.handler";
import BasicAuthMiddleware from "./middleware/basicAuth.middleware";

const port: string | number = process.env.PORT || 1242;

const app = express();

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

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.static(path.resolve(path.resolve(), "public")));

app.set("view engine", "ejs"); // configure template engine
app.set("views", path.resolve(path.resolve(), "views")); // set express to look in this folder to render our view

app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({ extended: true }));

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
