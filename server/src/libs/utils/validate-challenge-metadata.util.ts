import { BedtimeVarianceMetadataDto } from '@api/challenge/dto/metadata/bedtime-variance-metadata.dto';
import { SleepDurationMetadataDto } from '@api/challenge/dto/metadata/sleep-duration-metadata.dto';
import { TimeConsistencyMetadataDto } from '@api/challenge/dto/metadata/time-consistency-metadata.dto';
import { ChallengeType } from '@generated/prisma/enums';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validateChallengeMetadata = (
	type: ChallengeType,
	metadata: unknown,
): string[] => {
	let MetadataClass: ClassConstructor<object>;

	switch (type) {
		case ChallengeType.SLEEP_DURATION:
			MetadataClass = SleepDurationMetadataDto;
			break;
		case ChallengeType.BEDTIME_CONSISTENCY:
		case ChallengeType.WAKE_TIME_CONSISTENCY:
			MetadataClass = TimeConsistencyMetadataDto;
			break;
		case ChallengeType.BEDTIME_VARIANCE:
			MetadataClass = BedtimeVarianceMetadataDto;
			break;
		default:
			return [`Unsupported challenge type: ${String(type)}`];
	}

	const instance = plainToInstance(MetadataClass, metadata);
	const errors = validateSync(instance, {
		whitelist: true,
		forbidNonWhitelisted: true,
	});

	return errors.map((error) =>
		Object.values(error.constraints || {}).join(', '),
	);
};
