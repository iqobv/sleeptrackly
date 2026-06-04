import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetWeeklySummaryResponse =
	paths['/v1/weekly-summaries/{id}']['get']['responses']['200']['content']['application/json'];

export const getWeeklySummary = async (id: string) =>
	(await apiClient.get<GetWeeklySummaryResponse>(`/v1/weekly-summaries/${id}`))
		.data;
