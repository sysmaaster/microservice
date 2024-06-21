import app from "./app";
import ui_app from "./ui_app";
import { createServer } from "http";
import logger from "./services/logger.service";
import connect from "./services/MongoDB_Connect.service";
import { startMetricsServer } from "./services/metrics.service";
import socketIO from "./utils/socket";

function start_Api_Server() {
  const server = createServer(app);
  const port: string | number = process.env.SERVER_PORT || 1242;
  server.listen(port, async () => {
    logger.info(`Api Server listening at http://localhost:${port}`);
    startMetricsServer();
    await connect();
    //socketIO(server)
  });
}
function start_Front_Server() {
  const server = createServer(ui_app);
  const port: string | number = process.env.FRONTEND_PORT || 8081;
  server.listen(port, async () => {
    logger.info(`FrontEnd Serverstart at http://localhost:${port}`);
  });
}

start_Api_Server();
start_Front_Server();
