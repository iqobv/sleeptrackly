import { REPORT_TYPES } from '@/constants';

export type TReportType = (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];
