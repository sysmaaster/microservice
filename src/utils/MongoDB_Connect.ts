import mongoose from "mongoose";
import "dotenv/config";
import log from "../services/logger.service";

async function connect() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error(
        "MONGODB_URL is not defined in the environment variables."
      );
    }
    const dbUri: string = process.env.MONGODB_URL;
    const run = async () => {
      log.warn("Calling DB...");
      await mongoose.connect(dbUri);
    };
    run().catch((e) => {});
    mongoose.connection.on("connected", () => log.info("DB Connected"));
    mongoose.connection.on("disconnected", () => {
      log.fatal("disconnected - DB lost");
      run().catch(() => {});
    });
    mongoose.connection.on("error", (err) => {
      log.fatal(err, "Could not connect to db");
    });
  } catch (error) {
    log.fatal(error, "Catch connect to db");
  }
}

export default connect;
