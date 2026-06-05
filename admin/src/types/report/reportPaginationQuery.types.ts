import { ReportStatus } from './reportStatus.types';
import { ReportType } from './reportType.types';
import { SortBy, SortOrder } from './reportFilters.types';

export interface ReportPaginationQuery {
	page: number;
	limit: number;
	sortOrder?: SortOrder;
	sortBy?: SortBy;
	status?: ReportStatus;
	reportType?: ReportType;
}
