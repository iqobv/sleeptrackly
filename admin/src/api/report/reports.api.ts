import { ReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';
import { ReportStatus } from '@/types/report/reportStatus.types';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetReportsResponse =
	paths['/v1/admin/reports']['get']['responses']['200']['content']['application/json'];
type GetReportByIdResponse =
	paths['/v1/admin/reports/{id}']['get']['responses']['200']['content']['application/json'];
type UpdateReportResponse =
	paths['/v1/admin/reports/{id}']['patch']['responses']['200']['content']['application/json'];

export const getReports = async (query: ReportPaginationQuery) =>
	(
		await apiClient.get<GetReportsResponse>(`/v1/admin/reports`, {
			params: query,
		})
	).data;

export const getReport = async (id: string) =>
	(await apiClient.get<GetReportByIdResponse>(`/v1/admin/reports/${id}`)).data;

export const updateReport = async (
	id: string,
	data: { status?: ReportStatus; response?: string },
) =>
	(await apiClient.patch<UpdateReportResponse>(`/v1/admin/reports/${id}`, data))
		.data;
