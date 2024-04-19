import { Express, Request, Response } from "express";
import log from "./logger";

const UI_Viewer = (app: Express, port: number | string) => {
  // Docs in JSON format
  app.get("/", (req, res) => {
    const locals = {
      title: "NodeJs",
      description: "Free NodeJs User Management System",
    };
    try {
      const messages = req.flash("info");
      res.render("index", {
        locals,
        customers: [],
        current: 1,
        pages: 10,
        messages,
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/about", (req, res) => {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };

    try {
      res.render("about", locals);
    } catch (error) {
      console.log(error);
    }
    /*res.render("layouts/main", {
      title: "EMILL v6",
      body: " EMILL v6 Цей сервіс DEV-6 (API) створено 27.08.2023" +
      " в розробці до 30.10.2023" +
      " продовжено 01.01.2024" +
      " Сервіс Категорій Допрацьвано 14.04.2024" +
      "",*
    });*/
  });
  app.get("/add", (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };

    res.render("wallet/add", locals);
  });

  app.listen(port, () => {
    log.info(`UI create at http://localhost:${port}/`);
  });
};

export default UI_Viewer;
