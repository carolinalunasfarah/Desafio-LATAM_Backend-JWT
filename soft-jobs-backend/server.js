import express from "express";
import cors from "cors";
import { PORT } from "./config/db/config.js";
import registerRouter from "./config/routes/registerRoutes.js";
import logInRouter from "./config/routes/logInRoutes.js";
import { logger } from "logger-express";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(logger());
app.use(cors());
app.use(registerRouter);
app.use(logInRouter);

app.listen(PORT, () => {
    console.log(`🔥 Server on 🔥 http://localhost:${PORT}`);
});
