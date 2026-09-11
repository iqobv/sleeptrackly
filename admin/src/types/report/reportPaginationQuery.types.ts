import { SortOrder } from '../api/sortOrder.types';
import { SortBy } from './reportFilters.types';
import { ReportStatus } from './reportStatus.types';
import { ReportType } from './reportType.types';

export interface ReportPaginationQuery {
	page: number;
	limit: number;
	sortOrder?: SortOrder;
	sortBy?: SortBy;
	status?: ReportStatus;
	reportType?: ReportType;
}
