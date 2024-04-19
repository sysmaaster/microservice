import { Server } from "socket.io";
import log from "../services/logger.service";

function socketIO(server: any) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    log.info(`${socket.id} user conected`);
    io.emit("info", { msg: "The world is round, there is no up or down." });
    socket.conn.on("close", (reason) => {
      // called when the underlying connection is closed
      log.info(`${reason} -- user ${socket.id} lost conect`);
    });
  });
}
export default socketIO;
