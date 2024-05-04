import cors from "cors";
import express from "express";
import { Response, Request, NextFunction } from "express";
import uploadFile from "./middleware/uploadfile.middleware";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
const app = express();
const port = 3000;

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
// Static Files
const _basedir = path.resolve(path.resolve(), "static");
const directoryPath = path.resolve(_basedir, "uploads");
app.use(express.static(path.resolve(path.resolve(), "public")));

app.get("/", (req, res) => {
    res.sendStatus(200)
      return;
});
app.get("/file", (req: Request, res: Response, next: NextFunction) => {
  if (req.method == "GET") {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.write('<form action="/upload" method="POST" enctype="multipart/form-data" style="padding: 10px;">');
    res.write('<input type="file" name="file" multiple >');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
    
  } else res.sendStatus(500)
    return;
});
app.post("/upload", async (req: Request, res: Response) => {
  try {
    await uploadFile(req, res);
    if (req.files == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: ",
    }); //+ req.files.originalname,
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
    });
  }
});
app.get("/files", (req: Request, res: Response) => {
  const _basedir = path.resolve(path.resolve(), "static");
  const directoryPath = path.resolve(_basedir, "uploads");
  const baseUrl = "http://localhost:3000/files/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
      return;
    }

    let fileInfos: { name: string; url: string }[] = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
});
app.get("/files/:name", (req: Request, res: Response) => {
  const fileName = req.params.name;
  const _basedir = path.resolve(path.resolve(), "static");
  const directoryPath = path.resolve(_basedir, "uploads");

  res.download(directoryPath + "/" + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});
app.delete("/files/:name", (req: Request, res: Response) => {
  const fileName = req.params.name;
  const _basedir = path.resolve(path.resolve(), "static");
  const directoryPath = path.resolve(_basedir, "uploads");

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
});
app.delete("/filess/:name", (req: Request, res: Response) => {
  const fileName = req.params.name;
  const _basedir = path.resolve(path.resolve(), "static");
  const directoryPath = path.resolve(_basedir, "uploads");

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
