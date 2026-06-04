import { getWeeklySummary } from '@/api';

export type WeeklySummary = Awaited<ReturnType<typeof getWeeklySummary>>;
