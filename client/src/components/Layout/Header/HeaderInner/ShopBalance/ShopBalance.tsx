'use client';

import { getUserCoins } from '@/api/coin/userCoins.api';
import { CoinIcon } from '@/assets/icons';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { formatNumber } from '@/utils/numberFormatter.util';
import { useQuery } from '@tanstack/react-query';
import styles from './ShopBalance.module.scss';

export const ShopBalance = () => {
	const { data } = useQuery({
		queryFn: () => getUserCoins(),
		queryKey: QUERY_KEYS.coin.userCoin,
	});

	return (
		<div className={styles.balance}>
			<CoinIcon
				className={styles.icon}
				width={40}
				height={40}
				fill="currentColor"
			/>
			<div className={`${styles.amountWrapper} ${data ? styles.visible : ''}`}>
				{formatNumber(data?.amount || 0)}
			</div>
		</div>
	);
};
