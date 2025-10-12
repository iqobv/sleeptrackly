import { ISleepEntry } from './sleepEntry.types';

export interface IDashboardDay {
	day: string;
	data: ISleepEntry | null;
}
