import mongoose from "mongoose";
import log from "./logger";

async function connect() {
  const dbUri =
    "mongodb://root:example@localhost:27017/monefly?authMechanism=DEFAULT&authSource=admin"; //    "mongodb+srv://sysmaaster:nEp7NUjMz71lBH2q@cluster0.8eir6uf.mongodb.net/monefly?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const run = async () => {
      log.info("Calling to DB...")
    await mongoose.connect(dbUri);
    }
    run().catch((e)=>{  })
    mongoose.connection.on("connected", () =>  log.info("DB Connected"));
    mongoose.connection.on("reconnected", () =>  log.info("Reconnected"));
    mongoose.connection.on("disconnected", () => { log.error("DB lost connections"); run().catch(()=>{ })});
    mongoose.connection.on("error", err =>  { log.fatal(err, "Could not connect to db") });
    //log.info("DB connected");
  } catch (error) {
    log.fatal(error, "Catch connect to db");
  }
}

export default connect;
