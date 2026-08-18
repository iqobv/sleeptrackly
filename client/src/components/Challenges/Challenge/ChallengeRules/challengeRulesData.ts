import {
	BedtimeVarianceMetadata,
	SleepDurationMetadata,
	TimeConsistencyMetadata,
} from '@/types/challenge/challengeMetadata.types';
import { ChallengeType } from '@shared/types';

export interface ChallengeRulesData<T extends ChallengeType> {
	type: T;
	rules: string[];
}

export const SLEEP_DURATION_RULES = (
	metadata?: SleepDurationMetadata,
): string[] => {
	if (!metadata) return [];
	const hours = Math.floor(metadata.minDurationMinutes / 60);
	return [`You must sleep for at least ${hours} hours each night.`];
};

export const BEDTIME_VARIANCE_RULES = (
	metadata?: BedtimeVarianceMetadata,
): string[] => {
	if (!metadata) return [];
	return [
		`Your bedtime must not vary by more than ${metadata.maxVarianceMinutes} minutes from your average.`,
	];
};

export const TIME_CONSISTENCY_RULES = (
	metadata?: TimeConsistencyMetadata,
	isWakeTime: boolean = false,
): string[] => {
	if (!metadata) return [];
	const action = isWakeTime ? 'wake up' : 'go to bed';
	return [
		`You must ${action} at ${metadata.targetTime} (±${metadata.marginMinutes} minutes).`,
	];
};
