import { getWeeklySummary } from '@/api/weeklySummary/weeklySummary.api';

export type WeeklySummary = Awaited<ReturnType<typeof getWeeklySummary>>;
