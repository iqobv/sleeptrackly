import { DashboardQueryDto } from '@/dto/dashboard/dashboard.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetDashboadResponse =
	paths['/v1/sleep-entries/me']['get']['responses']['200']['content']['application/json'];

export const getDashboard = async (query: DashboardQueryDto) =>
	(
		await apiClient.get<GetDashboadResponse>(`/v1/sleep-entries/me`, {
			params: query,
		})
	).data;
