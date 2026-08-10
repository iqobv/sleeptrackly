'use client';

import { AcceptChallenge } from '@/components/Challenges/AcceptChallenge/AcceptChallenge';
import { ChallengeTag } from '@/components/Challenges/ChallengeTag/ChallengeTag';
import { Coin } from '@/components/Icons/Coin';
import { ProductImage } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { CHALLENGE_TIERS } from '@/constants/challengeTier.constants';
import { Challenge } from '@/types/challenge/challenge.types';
import { ProductType } from '@/types/product/productType.types';
import { Typography } from '@shared/ui';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './AvailableChallengeCard.module.scss';

interface AvailableChallengeCardProps {
	challenge: Challenge;
}

export const AvailableChallengeCard = ({
	challenge,
}: AvailableChallengeCardProps) => {
	const formatter = new Intl.NumberFormat(undefined);

	const key = challenge.product
		? challenge.product.type === ProductType.ITEM
			? challenge.product.item
			: challenge.product.bundle
		: null;

	return (
		<div className={styles.card}>
			<div className={styles.primary}>
				<div className={styles.header}>
					<div className={styles.tags}>
						<ChallengeTag>{CHALLENGE_TIERS[challenge.tier]}</ChallengeTag>
					</div>
					<div>
						<ChallengeTag isDuration>
							{challenge.durationDays} days
						</ChallengeTag>
					</div>
				</div>
				<div>
					<Typography<typeof Link>
						variant="h3"
						weight="semibold"
						as={Link}
						href={PRIVATE_PAGES.CHALLENGES.BY_ID(challenge.id)}
					>
						{challenge.translation.title}
					</Typography>
					<Typography color="secondary">
						{challenge.translation.description}
					</Typography>
				</div>
			</div>
			<div className={styles.secondary}>
				{challenge.dailyRewardCoins > 0 && (
					<div className={styles.daily}>
						<Typography variant="subtitle1" as="p">
							Daily Reward
						</Typography>
						<div className={styles.dailyReward}>
							<Coin width={30} height={30} />
							<Typography as="span" weight="semibold">
								{formatter.format(challenge.dailyRewardCoins)} / day
							</Typography>
						</div>
					</div>
				)}
				<div className={styles.grandPrize}>
					<Typography variant="subtitle1" as="p">
						Grand Prize
					</Typography>
					<div className={styles.prizes}>
						{challenge.rewardCoins > 0 && (
							<div className={clsx(styles.reward, styles.coins)}>
								<Coin width={40} height={40} />
								<Typography as="span" weight="semibold">
									{formatter.format(challenge.rewardCoins)}
								</Typography>
							</div>
						)}
						{challenge.rewardProductId && challenge.product && (
							<div className={clsx(styles.reward, styles.item)}>
								<ProductImage
									width={70}
									height={70}
									product={challenge.product}
								/>
								<div>
									<Typography variant="subtitle2" as="span" color="secondary">
										{challenge.product.itemType?.replaceAll('_', ' ')}
									</Typography>
									<Typography weight="semibold">
										{key?.translation.name}
									</Typography>
								</div>
							</div>
						)}
					</div>
				</div>
				<AcceptChallenge id={challenge.id} />
			</div>
		</div>
	);
};
