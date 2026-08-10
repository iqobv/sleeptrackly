import { ChallengeType, components } from '@shared/types';

export type SleepDurationMetadata =
	components['schemas']['SleepDurationMetadataDto'];

export type BedtimeVarianceMetadata =
	components['schemas']['BedtimeVarianceMetadataDto'];

export type TimeConsistencyMetadata =
	components['schemas']['TimeConsistencyMetadataDto'];

type EnforceExactKeys<T extends Record<ChallengeType, unknown>> = T;

export type ChallengeMetadataMap = EnforceExactKeys<{
	SLEEP_DURATION: SleepDurationMetadata;
	BEDTIME_VARIANCE: BedtimeVarianceMetadata;
	BEDTIME_CONSISTENCY: TimeConsistencyMetadata;
	WAKE_TIME_CONSISTENCY: TimeConsistencyMetadata;
}>;
