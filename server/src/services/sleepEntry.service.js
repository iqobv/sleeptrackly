import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(isoWeek);
dayjs.extend(utc);

// dayjs.extend(isoWeek);

import SleepEntry from "../models/sleepEntry.model.js";

const getSleepsEntryForWeek = async (userId, queries) => {
  const { week = 0 } = queries;

  const sleepEntries = await SleepEntry.find({ userId });

  console.log(sleepEntries);

  const groupedByWeek = {};

  for (const entry of sleepEntries) {
    const date = dayjs(entry.dateForChart);
    const key = `${date.year()}-W${date.isoWeek()}`;
    if (!groupedByWeek[key]) {
      groupedByWeek[key] = [];
    }
    groupedByWeek[key].push(entry);
  }

  const sortedWeeks = Object.keys(groupedByWeek).sort((a, b) => {
    const [yearA, weekA] = a.split("-W").map(Number);
    const [yearB, weekB] = b.split("-W").map(Number);
    return (
      dayjs(`${yearB}-W${weekB}`).startOf("week").valueOf() -
      dayjs(`${yearA}-W${weekA}`).startOf("week").valueOf()
    );
  });

  const selectedWeekKey = sortedWeeks[week];

  if (!selectedWeekKey) return [];

  const selectedWeek = Object.keys(groupedByWeek).find(
    (key) => key === selectedWeekKey
  );
  const weekNumber = selectedWeek.split("-W")[1];

  const startOfWeek = dayjs().isoWeek(weekNumber).startOf("isoWeek");

  const days = [...Array(7)].map((_, index) =>
    dayjs(startOfWeek)
      .add(index + 1, "day")
      .utc()
      .startOf("day")
      .toISOString()
  );

  console.log(days);

  const groupedByDay = days.map((day) => {
    console.log(day);
    const data =
      groupedByWeek[selectedWeekKey].find(
        (entry) =>
          dayjs(entry.dateForChart).toISOString() === dayjs(day).toISOString()
      ) || null;
    return {
      day: dayjs(day).format("YYYY-MM-DD"),
      data,
    };
  });

  const lengthWithData = groupedByDay.filter((day) => day.data).length;

  const summary = {
    weekNumber: Number(weekNumber),
    totalSleepDuration: groupedByDay.reduce((acc, day) => {
      if (!day.data) return acc;
      return acc + day.data.sleepDuration;
    }, 0),
    averageSleepDurationByData:
      groupedByDay.reduce((acc, day) => {
        if (!day.data) return acc;
        return acc + day.data.sleepDuration;
      }, 0) / lengthWithData,
    averageSleepDurationForWeek:
      groupedByDay.reduce((acc, day) => {
        if (!day.data) return acc;
        return acc + day.data.sleepDuration;
      }, 0) / groupedByDay.length,
  };

  const totalWeeks = Object.keys(groupedByWeek).length;

  const result = {
    statistics: summary,
    days: groupedByDay,
    totalWeeks,
  };

  return result;
};

export default { getSleepsEntryForWeek };
