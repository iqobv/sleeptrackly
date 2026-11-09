import { paths } from '@shared/types';
import { apiClient } from '../axios';

type DashboardResponse =
	paths['/v1/statistics']['get']['responses']['200']['content']['application/json'];

export const getDashboard = async (date: string) =>
	(
		await apiClient.get<DashboardResponse>('/v1/statistics', {
			params: { date },
		})
	).data;
