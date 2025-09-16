import { SleepEntryDto } from '../dto';

export interface GroupedByWeek {
	[key: string]: SleepEntryDto[];
}
