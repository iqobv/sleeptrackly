import { ReportFull, ReportsPaginated, ReportStatus } from '@/types';
import { ReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';
import { apiClient } from '../axios';

export const getReports = async (query: ReportPaginationQuery) =>
	(
		await apiClient.get<ReportsPaginated>(`/v1/admin/reports`, {
			params: query,
		})
	).data;

export const getReport = async (id: string) =>
	(await apiClient.get<ReportFull>(`/v1/admin/reports/${id}`)).data;

export const updateReport = async (
	id: string,
	data: { status?: ReportStatus; response?: string },
) => (await apiClient.patch<ReportFull>(`/v1/admin/reports/${id}`, data)).data;
