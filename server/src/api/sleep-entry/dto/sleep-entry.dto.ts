import { DefaultFieldsDto } from '@libs/dto';
import { Expose } from 'class-transformer';

export class SleepEntryDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() sleepStart: Date;
	@Expose() sleepEnd: Date;
	@Expose() sleepDuration: number;
	@Expose() dateForChart: string;
}
