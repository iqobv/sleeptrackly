'use client';

import { getUserCoins } from '@/api/coin/userCoins.api';
import { Coin } from '@/components/Icons/Coin';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useQuery } from '@tanstack/react-query';
import styles from './ShopBalance.module.scss';

export const ShopBalance = () => {
	const { data } = useQuery({
		queryFn: () => getUserCoins(),
		queryKey: QUERY_KEYS.coin.userCoin,
	});

	return (
		<div className={styles.balance}>
			<Coin className={styles.icon} width={40} height={40} />
			<div className={`${styles.amountWrapper} ${data ? styles.visible : ''}`}>
				{data?.amount}
			</div>
		</div>
	);
};
