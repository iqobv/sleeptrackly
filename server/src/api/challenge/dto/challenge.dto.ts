import { OmitType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ChallengeTranslationDto } from './challenge-translation.dto';
import { ChallengeEntityDto, transformMetadata } from './challenge.entity.dto';
import { BedtimeVarianceMetadataDto } from './metadata/bedtime-variance-metadata.dto';
import { SleepDurationMetadataDto } from './metadata/sleep-duration-metadata.dto';
import { TimeConsistencyMetadataDto } from './metadata/time-consistency-metadata.dto';
import { UserChallengeDto } from './user-challenge.dto';

export class FullChallengeDto extends ChallengeEntityDto {}

export class BaseChallengeDto extends OmitType(ChallengeEntityDto, [
	'translations',
	'product',
] as const) {
	@Expose()
	@Transform(transformMetadata)
	metadata?:
		| SleepDurationMetadataDto
		| TimeConsistencyMetadataDto
		| BedtimeVarianceMetadataDto
		| null;
}

export class ChallengeDto extends OmitType(ChallengeEntityDto, [
	'translations',
] as const) {
	@Type(() => ChallengeTranslationDto)
	@Expose()
	translation: ChallengeTranslationDto;

	@Expose()
	@Transform(transformMetadata)
	metadata?:
		| SleepDurationMetadataDto
		| TimeConsistencyMetadataDto
		| BedtimeVarianceMetadataDto
		| null;
}

export class ChallengeWithUserStatusDto extends ChallengeDto {
	@Expose() isParticipating: boolean;

	@Type(() => UserChallengeDto)
	@Expose()
	userChallenge: UserChallengeDto | null;
}
