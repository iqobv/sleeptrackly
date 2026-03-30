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
		<div className={styles['shop-balance']}>
			<Coin className={styles['shop-balance__icon']} width={40} height={40} />
			<div
				className={`${styles['shop-balance__amount-wrapper']} ${
					data ? styles['shop-balance__amount-wrapper--visible'] : ''
				}`}
			>
				{data?.amount}
			</div>
		</div>
	);
};

export default ShopBalance;
