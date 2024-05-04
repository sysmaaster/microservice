import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import responseTime from "response-time";
import swaggerDocs from "./services/swagger.service";
import DevsRouter from "./router/devs.routes";
import WalletRouter from "./router/wallet.routes";
import CategoriesRouter from "./router/categories.routes";
import errorMiddleware from "./middleware/error.middleware";
import errorLoggerHandler from "./handler/errorLogger.handler";
import { restResponseTimeHistogram } from "./services/metrics.service";
import invalidPathHandler from "./handler/invalidPath.handler";
import BasicAuthMiddleware from "./middleware/basicAuth.middleware";
import expressLayout from 'express-ejs-layouts'
import flash from 'connect-flash';
import session from 'express-session';
import methodOverride from 'method-override';

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(methodOverride('_method'));

// Static Files
app.use(express.static(path.resolve(path.resolve(), "public")));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

// Flash Messages
app.use(flash());//{ sessionKeyName: 'flashMessage' }

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set("view engine", "ejs"); // configure template engine
app.set("views", path.resolve(path.resolve(), "views")); // set express to look in this folder to render our view

/** Routes  */
app.get("/healthcheck", (req, res) => res.sendStatus(200));

//-- Auth
//app.use(BasicAuthMiddleware); 

swaggerDocs(app, port);

// Routes
app.use("/dev", DevsRouter());
app.use("/wallet", WalletRouter());
app.use("/categories", CategoriesRouter());

app.use(errorLoggerHandler); //-- ErrorException
app.use(errorMiddleware); //-- ErrorException

app.use(invalidPathHandler);

export default app;
