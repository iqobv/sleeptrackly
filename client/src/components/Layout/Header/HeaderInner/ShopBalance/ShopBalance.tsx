'use client';

import { getUserCoins } from '@/api';
import { Coin } from '@/components/Icons';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import styles from './ShopBalance.module.scss';

const ShopBalance = () => {
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

export default ShopBalance;
