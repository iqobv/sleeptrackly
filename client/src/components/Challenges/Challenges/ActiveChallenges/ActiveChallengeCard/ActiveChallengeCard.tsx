'use client';

import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { CHALLENGE_TIERS } from '@/constants/challengeTier.constants';
import type { ActiveChallenge } from '@/types/challenge/challenge.types';
import { Typography } from '@shared/ui';
import Link from 'next/link';
import { ChallengeTag } from '../../../ChallengeTag/ChallengeTag';
import styles from './ActiveChallengeCard.module.scss';

interface ActiveChallengeCardProps {
	userChallenge: ActiveChallenge;
}

export const ActiveChallengeCard = ({
	userChallenge,
}: ActiveChallengeCardProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.tags}>
				<ChallengeTag>
					{CHALLENGE_TIERS[userChallenge.challenge.tier]}
				</ChallengeTag>
				{userChallenge.status === 'FROZEN' && (
					<ChallengeTag isFrozen>Frozen</ChallengeTag>
				)}
				<ChallengeTag isFrozen>Frozen</ChallengeTag>
			</div>
			<div className={styles.info}>
				<Typography<typeof Link>
					variant="h3"
					as={Link}
					href={PRIVATE_PAGES.CHALLENGES.BY_ID(userChallenge.challenge.id)}
				>
					{userChallenge.challenge.translation.title}
				</Typography>
				<Typography color="secondary">
					{userChallenge.challenge.translation.description}
				</Typography>
			</div>
		</div>
	);
};
