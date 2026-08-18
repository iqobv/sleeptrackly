'use client';

import { RestoreChallenge } from '@/components/Challenges/RestoreChallenge/RestoreChallenge';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { CHALLENGE_TIERS } from '@/constants/challengeTier.constants';
import type { ActiveChallenge } from '@/types/challenge/challenge.types';
import { ChallengeStatus } from '@shared/types';
import { Typography } from '@shared/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';
import { ChallengeTag } from '../../../ChallengeTag/ChallengeTag';
import styles from './ActiveChallengeCard.module.scss';

interface ActiveChallengeCardProps {
	userChallenge: ActiveChallenge;
}

export const ActiveChallengeCard = ({
	userChallenge,
}: ActiveChallengeCardProps) => {
	const isFrozen = userChallenge.status === ChallengeStatus.FROZEN;
	const progress =
		userChallenge.progress / userChallenge.challenge.durationDays;

	return (
		<div className={styles.card}>
			<div className={styles.tags}>
				<ChallengeTag>
					{CHALLENGE_TIERS[userChallenge.challenge.tier]}
				</ChallengeTag>
				{isFrozen && <ChallengeTag isFrozen>Frozen</ChallengeTag>}
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
			<div className={styles.progress}>
				<div className={styles.progressInfo}>
					<Typography
						variant="subtitle1"
						color={isFrozen ? 'error' : 'secondary'}
						as="span"
					>
						{isFrozen ? 'Needs Recovery' : 'Progress'}
					</Typography>
					<Typography variant="subtitle1" as="span">
						{userChallenge.progress}/{userChallenge.challenge.durationDays}{' '}
					</Typography>
				</div>
				<div className={styles.progressBar}>
					<div
						className={clsx(styles.progressLine, isFrozen && styles.frozen)}
						style={{
							width: `${progress * 100}%`,
						}}
					/>
				</div>
				<div className={styles.progressAction}>
					{isFrozen ? (
						<RestoreChallenge
							id={userChallenge.challenge.id}
							maxRecoveries={userChallenge.challenge.maxRecoveries}
							usedRecoveries={userChallenge.usedRecoveries}
							status={userChallenge.status}
							buttonProps={{
								variant: 'outlined',
								fullWidth: true,
							}}
						>
							Use Restore Token
						</RestoreChallenge>
					) : (
						<Typography className={styles.text}>
							<GoDotFill color="var(--text-success)" size={20} /> On track for
							grand prize
						</Typography>
					)}
				</div>
			</div>
		</div>
	);
};
