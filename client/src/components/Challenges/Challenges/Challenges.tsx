'use client';

import { getChallenges } from '@/api/challenge/challenge.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { Loader } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { ActiveChallenges } from '../ActiveChallenges/ActiveChallenges';
import { AllChallenges } from '../AllChallenges/AllChallenges';
import { CreateChellengeButton } from '../CreateChellengeButton/CreateChellengeButton';
import styles from './Challenges.module.scss';

export const Challenges = () => {
	const { user } = useAuth();

	const { data: challenges, isLoading } = useQuery({
		queryKey: QUERY_KEYS.challenges.list(),
		queryFn: getChallenges,
		enabled: !!user?.id,
	});

	return (
		<div className={styles.challenges}>
			{isLoading && <Loader />}
			{!isLoading && challenges && (
				<>
					<CreateChellengeButton />
					<ActiveChallenges data={challenges} />
					<AllChallenges data={challenges} />
				</>
			)}
		</div>
	);
};
