import { getReport, getReports } from '@/api';

export type Report = Awaited<ReturnType<typeof getReports>>['items'][number];
export type FullReport = Awaited<ReturnType<typeof getReport>>;
