import express from "express";
import log from "../services/logger.service";

const Router = () => {
  const router = express.Router();

  /** render index */
  router.get("/", async (req, res) => {
    const locals = {
      title: "NodeJs",
      description: "Free NodeJs User Management System",
    };
    try {
      let wallets: any = [];
      let categories: any = [];

      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
      const messages = req.flash("info");
      res.render("index", {
        locals,
        current: 1,
        pages: 10,
        messages,
        wallets,
        categories,
      });
    } catch (error) {
      log.fatal(error);
    }
  });

  /** render about */
  router.get("/about", (req, res) => {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };
    try {
      res.render("about", locals);
    } catch (error) {
      log.fatal(error);
    }
  });

  //** render wallet/add" */
  router.get("/wallet/add", (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };

      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
    res.render("wallet/add", locals);
  });

  /** render wallet/view */
  router.get("/wallet/view/:id", async (req, res) => {
    try {
      const wallets_item: any = [];
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };

      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
      res.render("wallet/view", {
        locals,
        wallets_item,
      });
    } catch (error) {
      log.fatal(error);
    }
  });

  /** render wallet/edit */
  router.get("/wallet/edit/:id", async (req, res) => {
    try {
      const wallets_item: any = [];
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };

      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
      res.render("wallet/edit", {
        locals,
        wallets_item,
      });
    } catch (error) {
      log.fatal(error);
    }
  });
  //** render categories/add" */
  router.get("/categories/add", (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };

      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
    res.render("categories/add", locals);
  });
  /** render wallet/edit */
  router.get("/categories/edit/:id", async (req, res) => {
    try {
      const categories_item: any = [];
      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };

      res.render("categories/edit", {
        locals,
        categories_item,
      });
    } catch (error) {
      log.fatal(error);
    }
  });

  //** Create wallet */
  router.post("/wallet/add", async (req, res) => {
    /*************
     * 
     * 
     * 
     * 
     * 
     * ****** */});

  /** Update  wallet */
  router.post("/wallet/edit/:id", async (req, res) => {
    /*************
     * 
     * 
     * 
     * 
     * 
     * ****** */});

  /** delete wallet */
  router.post("/wallet/drop/:id", async (req, res) => {
    try {
      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */
    } catch (error) {
      console.log(error);
    }
  });

  //** Create categories */
  router.post(
    "/categories/add",
    async (
      req: { body: any; flash: (arg0: string, arg1: string) => void },
      res: {
        redirect: (arg0: string) => void;
        sendStatus: (arg0: number) => void;
      }
    ) => {
      /*************
       * 
       * 
       * 
       * 
       * 
       * ****** */}
  );

  /** Update  categories */
  router.post(
    "/categories/edit/:id",
    async (
      req: {
        params: { id: any };
        body: any;
        flash: (arg0: string, arg1: string) => void;
      },
      res: {
        redirect: (arg0: string) => void;
        sendStatus: (arg0: number) => void;
      }
    ) => {
      /*************
       *
       *
       *
       *
       *
       * ****** */
    }
  );

  /** delete wallet */
  router.post(
    "/categories/drop/:id",
    async (
      req: { params: { id: any }; flash: (arg0: string, arg1: string) => void },
      res: {
        redirect: (arg0: string) => void;
        sendStatus: (arg0: number) => void;
      }
    ) => {
      try {
        /*************
         *
         *
         *
         *
         *
         * ****** */
      } catch (error) {
        log.fatal(error);
        res.sendStatus(500);
      }
    }
  );

  return router;
};

export default Router;
