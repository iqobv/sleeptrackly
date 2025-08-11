export const getStatisticsByWeekForUser = async (week = 0) => {
	const res = await fetch(`/api/v1/sleep-entries/me?week=${week}`);

	if (!res.ok) throw new Error('Failed to fetch statistics');

	return res.json();
};
