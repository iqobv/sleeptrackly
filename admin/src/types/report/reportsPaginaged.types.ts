import { Report } from './report.types';
import { ReportPaginatedMeta } from './reportPaginagedMeta.types';

export interface ReportsPaginated {
	items: Report[];
	meta: ReportPaginatedMeta;
}
