import express from "express";
import cookieParser from "cookie-parser";
import router from "../routes/dataRoutes.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import http from "http";
import { configureWebSocket } from "../chat/webSocketConfig.js";
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../apiDocs.json" assert {type: "json"}

const app = express();
const port = 4100;

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// Middleware untuk mengatur header CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//middleware untuk memanggil semua route HTTP server
app.use(router);

//membuat server HTTP
const server = http.createServer(app);
configureWebSocket(server);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
