'use client';

import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { Challenge } from '@/types/challenge/challenge.types';
import { Button, SectionHeader } from '@shared/ui';
import Link from 'next/link';
import styles from './ChallengeItem.module.scss';

interface ChallengeItemProps {
	challenge: Challenge;
}

export const ChallengeItem = ({ challenge }: ChallengeItemProps) => {
	if (!challenge) return null;

	return (
		<li className={styles.challenge}>
			<div className={styles.wrapper}>
				<p className={styles.tag}>Challenge</p>
				<div className={styles.content}>
					<SectionHeader
						title={challenge.title}
						titleProps={{
							variant: 'h3',
						}}
						description={challenge.description}
						gap={3}
						padding={0}
					/>
				</div>
				<div className={styles.actions}>
					<Button variant="contained" color="secondary" asChild>
						<Link href={PRIVATE_PAGES.CHALLENGES.BY_ID(challenge.id)}>
							View Progress
						</Link>
					</Button>
				</div>
			</div>
		</li>
	);
};
