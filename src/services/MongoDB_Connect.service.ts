import mongoose from "mongoose";
import log from "./logger.service";

async function connect() {
  const dbUri: string =
    process.env.CONNECT_URL ||
    "mongodb://root:example@localhost:27017/monefly?authMechanism=DEFAULT&authSource=admin";

  try {
    const run = async () => {
      log.info("Calling DB...");
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
    //log.info("DB connected");
  } catch (error) {
    log.fatal(error, "Catch connect to db");
  }
}

export default connect;
