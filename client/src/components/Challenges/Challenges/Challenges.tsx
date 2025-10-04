'use client';

import { getChellenges } from '@/api';
import { Loader } from '@/components/UI';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import ActiveChallenges from '../ActiveChallenges/ActiveChallenges';
import AllChallenges from '../AllChallenges/AllChallenges';
import CreateChellengeButton from '../CreateChellengeButton/CreateChellengeButton';
import styles from './Challenges.module.scss';

const Challenges = () => {
	const { user } = useAuth();

	const { data: challenges, isLoading } = useQuery({
		queryKey: ['challenges', user?.id],
		queryFn: getChellenges,
		enabled: !!user?.id,
	});

	return (
		<div className={styles['challenges']}>
			{isLoading && <Loader />}
			{!isLoading && challenges && (
				<>
					<ActiveChallenges data={challenges} />
					<AllChallenges data={challenges} />
					<CreateChellengeButton />
				</>
			)}
		</div>
	);
};

export default Challenges;
