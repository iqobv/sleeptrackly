import { DashboardQueryDto } from '@/dto';
import { Dashboard } from '@/types';
import { apiClient } from '../axios';

export const getStatisticsByWeekForUser = async (query: DashboardQueryDto) =>
	(await apiClient.get<Dashboard>(`/v1/sleep-entries/me`, { params: query }))
		.data;
