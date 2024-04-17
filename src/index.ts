import app from "./app";
import logger from "./services/logger";
import { startMetricsServer } from "./services/metrics";
import connect from "./services/connect";
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
