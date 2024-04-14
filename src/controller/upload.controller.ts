import { Response, Request, NextFunction } from "express";
import uploadFile from "../middleware/uploadfile.middleware";
import path from "path";
import fs from "fs";

/**
 * Controller for file upload/download
 */
class UploadsController {
  async get (req: Request, res: Response, next: NextFunction){
    if(req.method == "GET"){
      res.render('fileupload.ejs');
      
  }
  }
  async upload (req: Request, res: Response){
      try {
        await uploadFile(req, res);
        console.log(req.files)
        if (req.files == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
        res.status(200).send({
          message: "Uploaded the file successfully: "
        }); //+ req.files.originalname,
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
        });
      }
  }

  async getListFiles  (req: Request, res: Response){
    const _basedir = path.resolve(path.resolve(), "static");
    const directoryPath = path.resolve(_basedir, "uploads");
    const baseUrl = "http://localhost:1242/upload/files/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
      return
    }

    let fileInfos: { name: string; url: string; }[] = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
  }
async download  (req: Request, res: Response){
  
    const fileName = req.params.name;
    const _basedir = path.resolve(path.resolve(), "static");
    const directoryPath = path.resolve(_basedir, "uploads");
  
    res.download(directoryPath +"/"+ fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  
}

async remove  (req: Request, res: Response){
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
}
async removeSync  (req: Request, res: Response){
  
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
}



}
export default new UploadsController();

