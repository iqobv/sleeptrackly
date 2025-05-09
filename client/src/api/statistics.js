export const getStatisticsByWeekForUser = async (userId, week = 0) => {
  const res = await fetch(`/api/v1/sleep-entries/user/${userId}?week=${week}`);

  if (!res.ok) throw new Error("Failed to fetch statistics");

  return res.json();
};
