'use client';

import { Button, SectionHeader } from '@/components/UI';
import { Challenge } from '@/types';
import styles from './ChallengeItem.module.scss';

interface ChallengeItemProps {
	challenge: Challenge;
}

const ChallengeItem = ({ challenge }: ChallengeItemProps) => {
	if (!challenge) return null;

	return (
		<li className={styles['challenge']}>
			<div className={styles['challenge__wrapper']}>
				<p className={styles['challenge__tag']}>Challenge</p>
				<div className={styles['challenge__content']}>
					<SectionHeader
						title={challenge.title}
						titleComponent="h3"
						titleClassName={styles['challenge__title']}
						description={challenge.description}
						gap={3}
						padding={0}
					/>
				</div>
				<div className={styles['challenge__actions']}>
					<Button variant="secondary" href={`/challenges/${challenge.id}`}>
						View Progress
					</Button>
				</div>
			</div>
		</li>
	);
};

export default ChallengeItem;
