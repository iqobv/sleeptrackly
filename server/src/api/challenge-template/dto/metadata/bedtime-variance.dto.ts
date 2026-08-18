import { Expose } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GenerationBedtimeVarianceMetadataDto {
	/**
	 * Array of maximum allowed variances in minutes for which the challenge should be generated
	 *
	 * @example [15, 30, 45]
	 */
	@Expose()
	@IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
	@Min(0, { each: true })
	maxVarianceMinutes: number[];
}
