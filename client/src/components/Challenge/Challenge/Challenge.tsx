'use client';

import { getChallengeById } from '@/api';
import { Loader } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import Calendar from '../Calendar/Calendar';
import ChallengeInfo from '../ChallengeInfo/ChallengeInfo';
import ChallengeSummary from '../ChallengeSummary/ChallengeSummary';
import styles from './Challenge.module.scss';

interface ChallengeProps {
	id: string;
}

const Challenge = ({ id }: ChallengeProps) => {
	const { data: challenge, isLoading } = useQuery({
		queryKey: QUERY_KEYS.challenges.one(id),
		queryFn: () => getChallengeById(id),
		enabled: !!id,
	});

	return (
		<div className={styles['challenge']}>
			{isLoading && <Loader />}
			{challenge && (
				<>
					<ChallengeSummary data={challenge} />
					<Calendar data={challenge} mode={challenge.frequency} />
					<ChallengeInfo data={challenge} />
				</>
			)}
		</div>
	);
};

export default Challenge;
