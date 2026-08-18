'use client';

import { getChallengeById } from '@/api/challenge/getChallengeById.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { ChallengeStatus } from '@shared/types';
import { skipToken, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Calendar } from '../Calendar/Calendar';
import { ChallengeObjective } from '../ChallengeObjective/ChallengeObjective';
import { ChallengePrize } from '../ChallengePrize/ChallengePrize';
import { ChallengeRules } from '../ChallengeRules/ChallengeRules';
import { ChallengeSummary } from '../ChallengeSummary/ChallengeSummary';
import { FrozenCard } from '../FrozenCard/FrozenCard';
import styles from './Challenge.module.scss';
import { ChallengePageLoader } from './ChallengeLoader';

interface ChallengeProps {
	id: string;
}

export const Challenge = ({ id }: ChallengeProps) => {
	const { data: challenge, isLoading } = useQuery({
		queryKey: QUERY_KEYS.challenges.detail(id),
		queryFn: id ? () => getChallengeById(id) : skipToken,
	});

	if (isLoading) return <ChallengePageLoader />;
	if (!challenge) notFound();

	return (
		<>
			<ChallengeSummary data={challenge} />
			<div className={styles.container}>
				<div className={styles.details}>
					<ChallengeObjective challenge={challenge} />
					{challenge.userChallenge?.status === ChallengeStatus.FROZEN && (
						<FrozenCard challenge={challenge} />
					)}
					<ChallengeRules challenge={challenge} />
					<Calendar data={challenge} />
				</div>
				<div className={styles.prize}>
					<ChallengePrize challenge={challenge} />
				</div>
			</div>
		</>
	);
};
