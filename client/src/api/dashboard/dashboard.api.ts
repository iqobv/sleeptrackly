import { Dashboard } from '@/types';
import { apiClient } from '../axios';

export const getStatisticsByWeekForUser = async (week = 0) =>
	(await apiClient.get<Dashboard>(`/v1/sleep-entries/me?week=${week}`)).data;
