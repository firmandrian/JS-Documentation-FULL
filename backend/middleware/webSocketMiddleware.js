import jwt from "jsonwebtoken";

/*
 * webSocketMiddleware authentication
*/
export const websocketMiddleware = (socket, next) => {
  const token = socket.handshake.query.token;
  //verify token 
  jwt.verify(token, "rahasia", (error, decodedToken) => {
    if (error) {
      // if token invalid, reject connection
      next(new Error("Authentication error"));
    } else {
      next();
    }
  });
};
