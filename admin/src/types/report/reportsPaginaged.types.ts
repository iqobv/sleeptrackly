import { IReport } from './report.types';
import { IReportPaginatedMeta } from './reportPaginagedMeta.types';

export interface IReportsPaginated {
	items: IReport[];
	meta: IReportPaginatedMeta;
}
