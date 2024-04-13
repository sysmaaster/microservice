import mongoose from "mongoose";
import log from "./logger";

async function connect() {
  const dbUri = "mongodb://root:example@localhost:27017/monefly?authMechanism=DEFAULT&authSource=admin"//    "mongodb+srv://sysmaaster:nEp7NUjMz71lBH2q@cluster0.8eir6uf.mongodb.net/monefly?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(dbUri);
    log.info("DB connected");
  } catch (error) {
    log.error(error, "Could not connect to db");
  }
}

export default connect;
