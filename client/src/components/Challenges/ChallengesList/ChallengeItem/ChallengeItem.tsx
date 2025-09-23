'use client';

import { Button } from '@/components/UI';
import { IChallenge } from '@/types';
import styles from './ChallengeItem.module.scss';

interface ChallengeItemProps {
	challenge: IChallenge;
}

const ChallengeItem = ({ challenge }: ChallengeItemProps) => {
	if (!challenge) return null;

	return (
		<li className={styles['challenge']}>
			<div className={styles['challenge__wrapper']}>
				<p className={styles['challenge__tag']}>Challenge</p>
				<div className={styles['challenge__content']}>
					<h3 className={styles['challenge__title']}>{challenge.title}</h3>
					<p className={styles['challenge__text']}>{challenge.description}</p>
				</div>
				<div className={styles['challenge__actions']}>
					<Button href={`/challenges/${challenge.id}`}>View Progress</Button>
				</div>
			</div>
		</li>
	);
};

export default ChallengeItem;
