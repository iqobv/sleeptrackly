import { Expose, Type } from 'class-transformer';
import { SleepEntryDto } from './sleep-entry.dto';

export class SleepDayDto {
	@Expose() day: string;

	@Expose() sleepDuration: number;

	@Expose()
	@Type(() => SleepEntryDto)
	data: SleepEntryDto[];
}
