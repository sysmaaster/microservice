import "dotenv/config";
import fs from "fs";
import app from "./app";
import frontend from "./frontend";
import { createServer } from "http";
import logger from "./services/logger.service";
import connect from "./utils//MongoDB_Connect";
import { startMetricsServer } from "./services/metrics.service";
import socketIO from "./utils/socket";

const updVersion = () => {
  const file = "./version";
  fs.readFile(file, "utf8", (err: any, data: string) => {
    if (err) logger.error(err);
    var parse = JSON.parse(data);
    parse.version++;
    logger.info(`version: ${parse.commit}.${parse.version}`);

    fs.writeFileSync(file, JSON.stringify(parse)),
      (err: any) => {
        if (err) logger.error(err);
      };
  });
};

updVersion();

function start_Api_Server() {
  const port = process.env.SERVER_PORT;
  const server = createServer(app);
  server.listen(port, async () => {
    logger.info(`Api Server listening at http://localhost:${port}`);
    startMetricsServer();
    await connect();
    //socketIO(server)
  });
}

function start_Front_Server() {
  const server = createServer(frontend);
  const port = process.env.FRONTEND_PORT;
  server.listen(port, async () => {
    logger.info(`FrontEnd Server start at http://localhost:${port}`);
  });
}

if (!process.env.SERVER_PORT) {
  logger.fatal(`SERVER_PORT is not defined in the environment variables.`);
} else {
  start_Api_Server();
  start_Front_Server();
}
