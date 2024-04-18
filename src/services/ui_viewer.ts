import { Express, Request, Response } from "express";
import log from "./logger";

const UI_Viewer = (app: Express, port: number | string) => {
  // Docs in JSON format
  app.get("/", (req, res) => {
    res.render("index", {
      title: "EMILL v6",
      text: " Працює - ОК",
    });
  });

  app.listen(port, () => {
    log.info(`UI create at http://localhost:${port}`);
  });
};

export default UI_Viewer;
