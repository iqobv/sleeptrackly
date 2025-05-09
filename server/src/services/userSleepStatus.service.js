import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

import UserSleepStatus from "../models/userSleepStatus.model.js";
import SleepEntry from "../models/sleepEntry.model.js";

const getSleepStatus = async (userId) => {
  const userSleepStatus = await UserSleepStatus.findOne({ userId });

  return userSleepStatus;
};

const updateSleepStatus = async (userId) => {
  const userSleepStatus = await UserSleepStatus.findOne({ userId });

  if (!userSleepStatus) return { error: true, message: "User not found" };

  let isSleeping = userSleepStatus?.isSleeping;
  let sleepStart = userSleepStatus?.sleepStart;

  if (isSleeping) {
    const sleepEnd = dayjs().toDate();

    const sleepDuration = dayjs().diff(sleepStart, "second");
    const dateForChart = dayjs(sleepEnd).utc().startOf("day").toDate();
    // const dateForChart = dayjs(sleepStart).format("YYYY-MM-DD");

    await SleepEntry.create({
      userId,
      sleepStart: sleepStart,
      sleepEnd,
      sleepDuration,
      dateForChart,
    });

    isSleeping = false;
    sleepStart = null;
  } else {
    sleepStart = new Date();
    isSleeping = true;
  }

  await userSleepStatus.updateOne({ isSleeping, sleepStart });

  return userSleepStatus;
};

export default { getSleepStatus, updateSleepStatus };
