import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import flash from "connect-flash";
import bodyParser from "body-parser";
import expressLayout from 'express-ejs-layouts'
import session from 'express-session';
import path from "path";
import Router from "./router/frontend.routes";

const ui_app = express();
const port = 3000;

ui_app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
ui_app.use(methodOverride("_method"));

// Static Files
ui_app.use(express.static(path.resolve(path.resolve(), "public")));

// Express Session
ui_app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

ui_app.use(bodyParser.urlencoded({ extended: true }));
ui_app.use(bodyParser.json()); // parse form data client

// Flash Messages
ui_app.use(flash()); //{ sessionKeyName: 'flashMessage' }

// Templating Engine
ui_app.use(expressLayout);
ui_app.set('layout', './layouts/main');
ui_app.set("view engine", "ejs"); // configure template engine
ui_app.set("views", path.resolve(path.resolve(), "views")); // set express to look in this folder to render our view

// Routes 
ui_app.use( Router());

export default ui_app;
