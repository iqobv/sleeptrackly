import { IDashboard } from '@/types';
import { apiClient } from '../axios';

export const getStatisticsByWeekForUser = async (week = 0) =>
	(await apiClient.get<IDashboard>(`/v1/sleep-entries/me?week=${week}`)).data;
