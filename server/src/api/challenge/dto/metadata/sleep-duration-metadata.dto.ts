import { Expose } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class SleepDurationMetadataDto {
	@Expose()
	@IsNumber()
	@Min(1)
	minDurationMinutes: number;
}
