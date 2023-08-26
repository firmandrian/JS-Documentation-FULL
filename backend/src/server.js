import express from "express";
import cookieParser from "cookie-parser";
import router from "../routes/dataRoutes.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import http from "http";
import { configureWebSocket } from "../chat/webSocketConfig.js";
import swaggerUi from "swagger-ui-express";
import { mergedSwaggerDocument } from "../configuration/swagger.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.config_port;

//swagger
router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(mergedSwaggerDocument)
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Middleware to set CORS headers
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//middleware for manage user sessions
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//middleware for call all route HTTP server/ restAPI
app.use(router);

/*
 * create server HTTP socket.io
 */
const server = http.createServer(app);

//configurewebsocket from file websocketConfig.js
configureWebSocket(server);

//listening HTTP on port 4100
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
