import userRouter from "./user.route.js";
import userSleepStatusRouter from "./userSleepStatus.route.js";
import sleepEntryRouter from "./sleepEntry.route.js";
import authRouter from "./auth.route.js";
import changelogRouter from "./changelog.route.js";
import challengeRouter from "./challenge.route.js";

const apiVersion = "v1";

export default (app) => {
  app.use(`/api/${apiVersion}/users`, userRouter);
  app.use(`/api/${apiVersion}/sleep`, userSleepStatusRouter);
  app.use(`/api/${apiVersion}/sleep-entries`, sleepEntryRouter);
  app.use(`/api/auth`, authRouter);
  app.use(`/api/${apiVersion}/changelog`, changelogRouter);
  app.use(`/api/${apiVersion}/challenges`, challengeRouter);
};
