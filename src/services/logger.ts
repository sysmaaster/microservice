import logger from "pino";
import dayjs from "dayjs";
import path from "path";
const _dirname = path.resolve(path.resolve(), "./");

const log = logger({
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: { hideColor : true , destination: `${_dirname}/app.log`, 
      },
      },
      {
        target: "pino-pretty", 
      options: {  colorize: true},
      },
    ],
  },
  base: {
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
