import { DashboardQueryDto } from '@/dto/dashboard/dashboard.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type DashboardResponse =
	paths['/v1/statistics']['get']['responses']['200']['content']['application/json'];

export const getDashboard = async (params: DashboardQueryDto) =>
	(
		await apiClient.get<DashboardResponse>('/v1/statistics', {
			params,
		})
	).data;
