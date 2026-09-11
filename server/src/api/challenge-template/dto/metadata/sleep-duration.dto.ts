import { Expose } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GenerationSleepDurationMetadataDto {
	@Expose()
	@IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
	@Min(1, { each: true })
	minDurationMinutes: number[];
}
