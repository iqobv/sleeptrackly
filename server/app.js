import { RedisStore } from "connect-redis";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";

import passport from "./src/config/passport.config.js";
import { errorHandler } from "./src/handlers/erorHandler.handler.js";
import initRoutes from "./src/routes/index.js";

import "./src/schedulers/challengeScheduler.scheduler.js";

const app = express();

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

const redisStore = new RedisStore({ client: redisClient });

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

console.log(process.env.CLIENT_URL);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);

app.get("/health", (req, res) => {
  return res.status(200).send("OK");
});

app.use(errorHandler);

export default app;
