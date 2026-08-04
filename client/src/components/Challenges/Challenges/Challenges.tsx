'use client';

import { SectionHeader } from '@shared/ui';
import { ActiveChallenges } from './ActiveChallenges/ActiveChallenges';
import styles from './Challenges.module.scss';

export const Challenges = () => {
	return (
		<div className={styles.challenges}>
			<SectionHeader title="Challenges" />
			<ActiveChallenges />
		</div>
	);
};
