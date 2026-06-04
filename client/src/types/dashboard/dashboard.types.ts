import { getStatisticsByWeekForUser } from '@/api';
import { components } from '../schema';

export type Dashboard = Awaited<ReturnType<typeof getStatisticsByWeekForUser>>;
export type DashboardDay = Dashboard['days'][number];
export type SleepEntry = components['schemas']['SleepEntryDto'];
export type Statistics = Dashboard['statistics'];
