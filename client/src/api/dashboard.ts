import { IDashboard } from '@/types';
import { fetcher } from '@/utils';

export const getStatisticsByWeekForUser = async (week = 0) =>
	await fetcher<IDashboard>(`/api/v1/sleep-entries/me?week=${week}`);
