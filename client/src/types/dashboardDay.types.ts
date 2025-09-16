import { ISleepEntry } from './sleepEntrie.types';

export interface IDashboardDay {
	day: string;
	data: ISleepEntry | null;
}
