import { SleepEntry } from './sleepEntry.types';

export interface DashboardDay {
	day: string;
	data: SleepEntry | null;
}
