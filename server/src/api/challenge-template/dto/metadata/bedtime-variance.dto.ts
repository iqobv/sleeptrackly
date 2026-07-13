import { Expose } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GenerationBedtimeVarianceMetadataDto {
	@Expose()
	@IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
	@Min(0, { each: true })
	maxVarianceMinutes: number[];
}
