import { HTTP_Status } from "../utils/HTTP_Status";
import { Response, Request, NextFunction } from "express";
import ErrorException from "../exceptions/error.exception";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import crypto from "crypto";
import _ from "lodash";

/*
profile_image.name - Имя загруженного файла, т. е. profile-image.jpg
profile_image.mv - Функция для перемещения файла в другое место на сервере
profile_image.mimetype - Тип файла
profile_image.size - Размер файла в байтах
profile_image.data - Бинарное представление загруженного файла

class UploadsController {
  async photo(req: Request, res: Response) {
    try {
      // если файлов нет
      if (!req.files) {
        // отправляем ответ, что нет файлов для загрузки
        res.send({
          status: false,
          message: "Нет файлов для загрузки",
        });
      } else {
        // Используем название поля profile_image из html разметки для получения ссылки на загружаемый файл
        const image = req.files.profile_image;

        const filename = crypto
          .createHash("md5")
          .update(image.name)
          .digest("hex");

        // расширение файла
        const extension = image.name.substring(image.name.lastIndexOf(".") + 1);

        // используем метод mv() для сохранения файла в папке ./user/avatars/
        image.mv("./user/avatars/" + filename + "." + extension);

        // отправляем ответ
        res.send({
          status: true,
          message: "Файл загружен",
          data: {
            name: filename,
            extension: extension,
            mimetype: image.mimetype, // тип картинки, как он пришел от клиента
            size: image.size,
          },
        });
      }
    } catch (err) {
      // отправляем 500 код об ошибке
      res.status(500).send(err);
    }
  }
}

export default new UploadsController();
*/
