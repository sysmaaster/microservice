import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import flash from "connect-flash";
import bodyParser from "body-parser";
import expressLayout from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import Router from "./router/frontend.routes";

const frontend = express();

frontend.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
frontend.use(methodOverride("_method"));

// Static Files
frontend.use(express.static(path.resolve(path.resolve(), "public")));

// Express Session
frontend.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

frontend.use(bodyParser.urlencoded({ extended: true }));
frontend.use(bodyParser.json()); // parse form data client

// Flash Messages
frontend.use(flash()); //{ sessionKeyName: 'flashMessage' }

// Template Engine
frontend.use(expressLayout);
frontend.set("layout", "./layouts/main");
frontend.set("view engine", "ejs"); // configure template engine
frontend.set("views", path.resolve(path.resolve(), "views")); // set express to look in this folder to render our view

// Routes
frontend.use(Router());

export default frontend;
