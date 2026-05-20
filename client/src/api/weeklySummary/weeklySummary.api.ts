import { WeeklySummary } from '@/types';
import { apiClient } from '../axios';

export const getWeeklySummary = async (id: string) =>
	(await apiClient.get<WeeklySummary>(`/v1/weekly-summaries/${id}`)).data;
