import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import responseTime from "response-time";
import userRouter from "./router/user.routes";
import logger from "./services/logger.service";
import WalletRouter from "./router/wallet.routes";
import swaggerDocs from "./services/swagger.service";
import ContractRouter from "./router/contract.routes";
import CategoriesRouter from "./router/categories.routes";
import errorMiddleware from "./middleware/error.middleware";
import errorLoggerHandler from "./handler/errorLogger.handler";
import invalidPathHandler from "./handler/invalidPath.handler";
import { restResponseTimeHistogram } from "./services/metrics.service";
import "dotenv/config";
import auth from "./middleware/auth.middleware";
import logRequest from "./middleware/logerReq.middleware";

const app = express();

//responseTime;
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

// Cors
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

// Parse form data client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logger  Request form client
app.use(logRequest);

// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //* 7,  1 week
    },
  })
);

// Express Session
//app.use()

app.set("view engine", "ejs"); // configure template engine
app.set("views", path.resolve(path.resolve(), "views")); // set express to look in this folder to render our view

/** Routes  */
app.get("/api/healthcheck", (req, res) => res.sendStatus(200));

//-- Auth
if (!process.env.SERVER_PORT) {
  logger.fatal(`SERVER_PORT is not defined in the environment variables.`);
} else {
  swaggerDocs(app, process.env.SERVER_PORT);
}

// Routes
app.use("/api/users", userRouter);
app.use("/api/wallet", auth, WalletRouter);
app.use("/api/categories", auth, CategoriesRouter);
app.use("/api/part", auth, ContractRouter);

app.use(errorLoggerHandler); //-- ErrorException
app.use(errorMiddleware); //-- ErrorException

app.use(invalidPathHandler);

export default app;
