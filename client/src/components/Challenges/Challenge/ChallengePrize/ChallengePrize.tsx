'use client';

import { Coin } from '@/components/Icons/Coin';
import { ProductImage } from '@/components/UI';
import { ChallengeFull } from '@/types/challenge/challenge.types';
import { ProductType } from '@shared/types';
import { Divider, Typography } from '@shared/ui';
import { AcceptChallenge } from '../../AcceptChallenge/AcceptChallenge';
import { ChallengeCardContainer } from '../ChallengeCardContainer/ChallengeCardContainer';
import styles from './ChallengePrize.module.scss';

interface ChallengePrizeProps {
	challenge: ChallengeFull;
}

export const ChallengePrize = ({ challenge }: ChallengePrizeProps) => {
	const product = challenge.product;
	const reward = challenge.rewardCoins;

	const formatter = new Intl.NumberFormat(undefined);

	return (
		<ChallengeCardContainer className={styles.prize} title="Grand Prize">
			{product && (
				<div className={styles.product}>
					<ProductImage product={product} height={200} width={200} />
					<Typography color="secondary">
						{product.type === ProductType.ITEM
							? product.itemType
							: product.type === ProductType.BUNDLE
								? 'BUNDLE'
								: ''}
					</Typography>
					<Typography>
						{product.item?.translation.name || product.bundle?.translation.name}
					</Typography>
				</div>
			)}
			{reward && product && <Divider />}
			{reward && reward > 0 && (
				<Typography className={styles.reward} align="center" weight="semibold">
					<Coin width={48} height={48} /> {formatter.format(reward)} Coins
				</Typography>
			)}
			{!challenge.userChallenge && (
				<>
					<Divider />
					<AcceptChallenge id={challenge.id} />
				</>
			)}
		</ChallengeCardContainer>
	);
};
