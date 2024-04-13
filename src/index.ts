import app from "./app";
import logger from "./services/logger";
import { startMetricsServer } from "./services/metrics";
import connect from "./services/connect";

function startServer() {
  const port = 1242;
  app.listen(port, async () => {
    logger.info(`Example App listening at http://localhost:${port}`);
    startMetricsServer();
    await connect();
  });
}

startServer();
