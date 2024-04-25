import app from "./app";
import logger from "./services/logger.service";
import { startMetricsServer } from "./services/metrics.service";
import connect from "./services/MongoDB_Connect.service";
import { createServer } from "http";
import socketIO from "./utils/socket";

function startServer() {
  const server = createServer(app);
  const port: string | number = process.env.PORT || 1242;
  server.listen(port, async () => {
    logger.info(`Example App listening at http://localhost:${port}`);
    startMetricsServer();
    await connect();
    //socketIO(server)
  });
}

startServer();
