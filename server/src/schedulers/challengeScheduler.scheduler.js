import { schedule } from "node-cron";

import challengeService from "../services/challenge.service.js";

schedule("*/10 * * * *", async () => {
  await challengeService.updateChallengeStatuses();
});
