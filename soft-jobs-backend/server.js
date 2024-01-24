import express from "express";
import cors from "cors";
import { PORT } from "./config/db/config.js";
import router from "./config/routes/softJobsRoutes.js";
import { logger } from "logger-express";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(logger());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
    console.log(`🔥 Server on 🔥 http://localhost:${PORT}`);
});
