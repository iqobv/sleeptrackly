import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { GenerationBedtimeVarianceMetadataDto } from './metadata/bedtime-variance.dto';
import { GenerationSleepDurationMetadataDto } from './metadata/sleep-duration.dto';
import { GenerationTimeConsistencyMetadataDto } from './metadata/time-consistency.dto';

@ApiExtraModels(
	GenerationBedtimeVarianceMetadataDto,
	GenerationTimeConsistencyMetadataDto,
	GenerationSleepDurationMetadataDto,
)
export class GenerationRulesDto {
	/** Array of durations in days for which the challenge should be generated
	 * @example [7, 14, 21]
	 */
	@Expose()
	@IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
	durations: number[];

	@Expose()
	@ApiProperty({
		oneOf: [
			{ $ref: getSchemaPath(GenerationBedtimeVarianceMetadataDto) },
			{ $ref: getSchemaPath(GenerationTimeConsistencyMetadataDto) },
			{ $ref: getSchemaPath(GenerationSleepDurationMetadataDto) },
		],
	})
	metadata:
		| GenerationBedtimeVarianceMetadataDto
		| GenerationTimeConsistencyMetadataDto
		| GenerationSleepDurationMetadataDto;
}
