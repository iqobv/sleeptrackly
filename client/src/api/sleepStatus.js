import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const fetchSleepStatusByUserId = async () => {
  const res = await fetch(`/api/v1/sleep/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch sleep status");

  return res.json();
};

export const updateSleepStatus = async () => {
  const clickedBy = dayjs()
    .tz(dayjs.tz.guess())
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  console.log(clickedBy);

  const res = await fetch(`/api/v1/sleep/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      clickedBy,
    }),
  });

  console.log(clickedBy);
  console.log(clickedBy);

  if (!res.ok) throw new Error("Failed to update sleep status");

  return res.json();
};
