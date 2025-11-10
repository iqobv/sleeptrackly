import { REPORT_STATUS } from '@/constants';

export type TReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];
