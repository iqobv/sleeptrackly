import { Challenge } from '@/types/challenge/challenge.types';
import { ChallengeMetadataMap } from '@/types/challenge/challengeMetadata.types';
import { ChallengeType } from '@shared/types';
import {
	BEDTIME_VARIANCE_RULES,
	ChallengeRulesData,
	SLEEP_DURATION_RULES,
	TIME_CONSISTENCY_RULES,
} from './challengeRulesData';

export type StrictChallenge = Challenge &
	{
		[K in ChallengeType]: {
			type: K;
			metadata?: ChallengeMetadataMap[K];
		};
	}[ChallengeType];

export const getChallengeRules = (
	rawChallenge: Challenge,
): ChallengeRulesData<ChallengeType> => {
	const challenge = rawChallenge as unknown as StrictChallenge;

	const rules: string[] = [];

	rules.push(
		challenge.maxRecoveries && challenge.maxRecoveries > 0
			? `You can restore ${challenge.maxRecoveries} days.`
			: `You cannot restore any days.`,
	);

	switch (challenge.type) {
		case ChallengeType.SLEEP_DURATION:
			rules.push(...SLEEP_DURATION_RULES(challenge.metadata));
			break;

		case ChallengeType.BEDTIME_VARIANCE:
			rules.push(...BEDTIME_VARIANCE_RULES(challenge.metadata));
			break;

		case ChallengeType.BEDTIME_CONSISTENCY:
			rules.push(...TIME_CONSISTENCY_RULES(challenge.metadata, false));
			break;

		case ChallengeType.WAKE_TIME_CONSISTENCY:
			rules.push(...TIME_CONSISTENCY_RULES(challenge.metadata, true));
			break;

		default:
			break;
	}

	return {
		type: challenge.type,
		rules,
	};
};
