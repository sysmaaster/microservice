import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import responseTime from "response-time";
import fileUpload from "express-fileupload";
import swaggerDocs from "./services/swagger";
import DevsRouter from "./router/devs.routes";
import WalletRouter from "./router/wallet.routes";
import CategoriesRouter from "./router/categories.routes";
import errorMiddleware from "./middleware/error.middleware";
import errorLoggerHandler from "./handler/errorLogger.handler";
import { restResponseTimeHistogram } from "./services/metrics";
import invalidPathHandler from "./handler/invalidPath.handler";
import BasicAuthMiddleware from "./middleware/basicAuth.middleware";

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const _dirname = path.resolve(path.resolve(), "./public");
app.use(express.static(path.resolve(path.resolve(), "./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve(_dirname, "./"));
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
  res.render("./ejs/index", {
    title: "EMILL DEV-v5",
    text: " EMILL Працює - ОК",
  });
});
//app.use(BasicAuthMiddleware); //-- Auth

swaggerDocs(app, 1242);
app.use("/dev", DevsRouter());
app.use("/wallet", WalletRouter());
app.use("/categories", CategoriesRouter());

//app.use("/transaction", TransferRouter());
app.use(errorLoggerHandler); //-- ErrorException
app.use(errorMiddleware); //-- ErrorException

app.use(invalidPathHandler);

export default app;
