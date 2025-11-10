import { IReportFull, IReportsPaginated, TReportStatus } from '@/types';
import { IReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';
import { fetcher } from '@/utils';

export const getReports = async (query: IReportPaginationQuery) => {
	const params = new URLSearchParams(
		Object.entries(query)
			.filter(([_, value]) => value !== undefined && value !== null)
			.map(([key, value]) => [key, String(value)])
	);

	return await fetcher<IReportsPaginated>(
		`/api/v1/admin/reports?${params.toString()}`
	);
};

export const getReport = async (id: string) =>
	await fetcher<IReportFull>(`/api/v1/admin/reports/${id}`);

export const updateReport = async (
	id: string,
	data: { status?: TReportStatus; response?: string }
) =>
	await fetcher<IReportFull>(`/api/v1/admin/reports/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
