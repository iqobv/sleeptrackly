'use client';

import { getChallengeById } from '@/api';
import { Loader } from '@/components/UI';
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
		queryKey: ['challenge', id],
		queryFn: () => getChallengeById(id),
		enabled: !!id,
	});

	return (
		<div className={styles['challenge']}>
			{isLoading && <Loader />}
			{challenge && (
				<>
					<ChallengeSummary data={challenge} />
					{challenge.frequency === 'DAILY' && (
						<Calendar data={challenge} mode="daily" />
					)}
					{challenge.frequency === 'WEEKLY' && (
						<Calendar data={challenge} mode="weekly" />
					)}
					<ChallengeInfo data={challenge} />
				</>
			)}
		</div>
	);
};

export default Challenge;
