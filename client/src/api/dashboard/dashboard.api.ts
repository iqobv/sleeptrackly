import { DashboardQueryDto } from '@/dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetStatisticsByWeekForUserResponse =
	paths['/v1/sleep-entries/me']['get']['responses']['200']['content']['application/json'];

export const getStatisticsByWeekForUser = async (query: DashboardQueryDto) =>
	(
		await apiClient.get<GetStatisticsByWeekForUserResponse>(
			`/v1/sleep-entries/me`,
			{ params: query },
		)
	).data;
