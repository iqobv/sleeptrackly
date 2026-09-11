import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class SaveSleepEndDto {
	@Type(() => Date)
	@IsDate()
	sleepEnd: Date;
}
