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
    level: process.env.PINO_LOG_LEVEL || "info", //
    timestamp: () => `,"time":"${dayjs().format("HH:mm:ss DD/MM/YYYY")}"`,
    redact: {
      paths: ["user.name", "user.address", "user.passport", "user.phone"],
      censor: "[ТАЙНА]",
      //remove: true, //полностью удалить эти поля
    },
  },
  transport
);

export default log;
