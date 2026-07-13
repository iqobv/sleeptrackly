import {
	ApiPropertyOptional,
	getSchemaPath,
	OmitType,
	PartialType,
} from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';
import { CreateChallengeDto } from './create-challenge.dto';
import { BedtimeVarianceMetadataDto } from './metadata/bedtime-variance-metadata.dto';
import { SleepDurationMetadataDto } from './metadata/sleep-duration-metadata.dto';
import { TimeConsistencyMetadataDto } from './metadata/time-consistency-metadata.dto';

export class UpdateChallengeDto extends PartialType(
	OmitType(CreateChallengeDto, ['metadata'] as const),
) {
	@ApiPropertyOptional({
		oneOf: [
			{ $ref: getSchemaPath(SleepDurationMetadataDto) },
			{ $ref: getSchemaPath(TimeConsistencyMetadataDto) },
			{ $ref: getSchemaPath(BedtimeVarianceMetadataDto) },
		],
	})
	@IsOptional()
	@IsObject()
	metadata?: unknown;
}
