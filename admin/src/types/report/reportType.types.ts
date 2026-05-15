import { REPORT_TYPES } from '@/constants';

export type ReportType = (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];
