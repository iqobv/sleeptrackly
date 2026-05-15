import { IReportFull, IReportsPaginated, TReportStatus } from '@/types';
import { IReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';
import { apiClient } from '../axios';

export const getReports = async (query: IReportPaginationQuery) =>
	(
		await apiClient.get<IReportsPaginated>(`/v1/admin/reports`, {
			params: query,
		})
	).data;

export const getReport = async (id: string) =>
	(await apiClient.get<IReportFull>(`/v1/admin/reports/${id}`)).data;

export const updateReport = async (
	id: string,
	data: { status?: TReportStatus; response?: string },
) => (await apiClient.patch<IReportFull>(`/v1/admin/reports/${id}`, data)).data;
