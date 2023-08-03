import { Server } from "socket.io";
import { websocketMiddleware } from "../middleware/webSocketMiddleware.js";
import jwt from "jsonwebtoken"

/**
 * Web Socket :
 * @module WebSocket
 * @alias module:WebSocket
 * @author Firman Andrian
 * @copyright 2023
 * @type {object}
 */

// Membuat instance Socket.IO dan melekatkannya pada server HTTP
export const configureWebSocket = (server) => {
    const io = new Server(server, {
      cors: {
        origin: "*", //"http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

  io.use(websocketMiddleware)
  
  io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);
    //terima IDroom dan token dari FE ke server pada parameter (data,token)
    socket.on("join_room", (data, token) => {
      console.log(data, token);
      if (!token) {
        socket.disconnect();
        console.log(`User dengan ID: ${socket.id} Dilarang`);
      } else {
        jwt.verify(token, "rahasia", (error, decodedToken) => {
          if (error) {
            socket.disconnect();
          } else {
            socket.join(data);
            console.log(`User ID: ${socket.id} joined room: ${data}`);
          }
        });
      }
    });
  
    //fungsi dari socket io saat user mengirim pesan
    socket.on("send_message", (data, token) => {
      const time =
        new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
      console.log(data.time, time);
      if (!token) {
        socket.disconnect();
        return;
      } else {
        jwt.verify(token, "rahasia", (error, decodedToken) => {
          if (error) {
            socket.disconnect();
          } else if (
            data.author !== decodedToken.username ||
            data.time !== time
          ) {
            socket.disconnect();
          } else {
            socket.to(data.room).emit(`receive_message`, data);
          }
        });
      }
    });
    
    //fungsi dari socket io saat user terputus dari sebuah room
    socket.on("disconnect", () => {
      console.log(`User Disconnected ${socket.id}`);
    });
  });
};