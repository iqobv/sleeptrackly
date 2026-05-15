import { REPORT_STATUS } from '@/constants';

export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];
