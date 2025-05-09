import express from "express";
import cors from "cors";

const app = express();

import initRoutes from "./src/routes/index.js";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

export default app;
