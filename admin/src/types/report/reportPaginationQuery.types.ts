import { ReportStatus } from './reportStatus.types';
import { ReportType } from './reportType.types';

export interface ReportPaginationQuery {
	page: number;
	pageSize: number;
	sortOrder?: 'asc' | 'desc';
	sortBy?: 'createdAt' | 'updatedAt';
	status?: ReportStatus;
	reportType?: ReportType;
}
