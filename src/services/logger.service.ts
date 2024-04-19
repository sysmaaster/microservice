import dayjs from "dayjs";
import path from "path";
import pino from "pino";
const _dirname = path.resolve(path.resolve(), "./");

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { hideColor: true, destination: `${_dirname}/app.log` },
    },
    {
      target: "pino-pretty",
      options: { colorize: true },
    },
  ],
});

const log = pino(
  {
    base: {},
    level: process.env.LOG_LEVEL || "info", //
    timestamp: () => `,"time":"${dayjs().format()}"`, //2024-04-18T16:10:18+03:00
    redact: {
      paths: ["user.name", "user.address", "user.passport", "user.phone"],
      censor: "[ТАЙНА]",
      //remove: true, //полностью удалить эти поля
    },
  },
  transport
);

export default log;
