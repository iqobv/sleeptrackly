import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(isoWeek);
dayjs.extend(utc);

import SleepEntry from "../models/sleepEntry.model.js";

const getSleepsEntryForWeek = async (userId, queries) => {
  const { week = 0 } = queries;
  const sleepEntries = await SleepEntry.find({ userId });

  const groupedByWeek = {};
  for (const entry of sleepEntries) {
    const date = dayjs(entry.dateForChart, "YYYY-MM-DD");
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
      dayjs().isoWeek(weekB).year(yearB).startOf("isoWeek").valueOf() -
      dayjs().isoWeek(weekA).year(yearA).startOf("isoWeek").valueOf()
    );
  });

  let year, weekNumber, entriesForWeek;

  if (week === 0) {
    const now = dayjs();
    year = now.year();
    weekNumber = now.isoWeek();
    const currentKey = `${year}-W${weekNumber}`;
    entriesForWeek = groupedByWeek[currentKey] || [];
  } else {
    const selectedKey = sortedWeeks[week];
    if (!selectedKey) {
      const now = dayjs();
      year = now.year();
      weekNumber = now.isoWeek();
      const startOfWeek = now.startOf("isoWeek");

      const days = [...Array(7)].map((_, i) => ({
        day: startOfWeek.clone().add(i, "day").format("YYYY-MM-DD"),
        data: null,
      }));

      return {
        statistics: {
          weekNumber,
          totalSleepDuration: 0,
          averageSleepDurationByData: 0,
          averageSleepDurationForWeek: 0,
        },
        days,
        totalWeeks: 1,
      };
    }

    const [yearStr, weekStr] = selectedKey.split("-W");
    year = Number(yearStr);
    weekNumber = Number(weekStr);
    entriesForWeek = groupedByWeek[selectedKey];
  }

  const startOfWeek = dayjs().year(year).isoWeek(weekNumber).startOf("isoWeek");
  const days = [...Array(7)].map((_, i) => {
    const day = startOfWeek.clone().add(i, "day").format("YYYY-MM-DD");
    const data =
      entriesForWeek.find((entry) => entry.dateForChart === day) || null;
    return { day, data };
  });

  const totalSleepDuration = days.reduce(
    (acc, d) => acc + (d.data?.sleepDuration || 0),
    0
  );
  const daysWithData = days.filter((d) => d.data).length;

  return {
    statistics: {
      weekNumber,
      totalSleepDuration,
      averageSleepDurationByData: daysWithData
        ? totalSleepDuration / daysWithData
        : 0,
      averageSleepDurationForWeek: totalSleepDuration / 7,
    },
    days,
    totalWeeks: sortedWeeks.includes(`${year}-W${weekNumber}`)
      ? sortedWeeks.length
      : sortedWeeks.length + 1,
  };
};

export default { getSleepsEntryForWeek };
