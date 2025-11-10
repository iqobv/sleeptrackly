import { TReportStatus } from './reportStatus.types';
import { TReportType } from './reportType.types';

export interface IReportPaginationQuery {
	page: number;
	pageSize: number;
	sortOrder?: 'asc' | 'desc';
	sortBy?: 'createdAt' | 'updatedAt';
	status?: TReportStatus;
	reportType?: TReportType;
}
