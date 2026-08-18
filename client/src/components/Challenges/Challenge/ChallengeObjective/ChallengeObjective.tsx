'use client';

import { ChallengeFull } from '@/types/challenge/challenge.types';
import { Typography } from '@shared/ui';
import { ChallengeCardContainer } from '../ChallengeCardContainer/ChallengeCardContainer';

interface ChallengeObjectiveProps {
	challenge: ChallengeFull;
}

export const ChallengeObjective = ({ challenge }: ChallengeObjectiveProps) => {
	return (
		<ChallengeCardContainer gap={5} title="Challenge Objective">
			<Typography>{challenge.translation.description}</Typography>
		</ChallengeCardContainer>
	);
};
