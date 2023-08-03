import jwt from "jsonwebtoken";

export const websocketMiddleware = (socket, next) => {
  //   const token =
  //     socket.handshake.query.token || socket.handshake.headers["token"];
  const token = socket.handshake.query.token;
  // Lakukan verifikasi token
  jwt.verify(token, "rahasia", (error, decodedToken) => {
    if (error) {
      // Jika token tidak valid, tolak koneksi
      next(new Error("Authentication error"));
    } else {
      next();
    }
  });
};
