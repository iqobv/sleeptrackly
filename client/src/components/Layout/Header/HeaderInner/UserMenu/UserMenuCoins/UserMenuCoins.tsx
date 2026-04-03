import { getUserCoins } from '@/api';
import { Coin } from '@/components/Icons';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import styles from './UserMenuCoins.module.scss';
import UserMenuCoinsLoader from './UserMenuCoinsLoader';

const UserMenuCoins = () => {
	const { data: userCoins, isLoading } = useQuery({
		queryFn: () => getUserCoins(),
		queryKey: QUERY_KEYS.coin.userCoin,
	});

	return (
		<div className={styles['coins']}>
			{isLoading && <UserMenuCoinsLoader />}
			{userCoins && (
				<div className={styles['coins__container']}>
					<>
						<p className={styles['coins__label']}>Balance</p>
						<div className={styles['coins__balance']}>
							<Coin
								className={styles['coins__icon']}
								width={40}
								height={40}
								fill="var(--color-main-text)"
							/>
							<p className={styles['coins__amount']}>
								{userCoins.amount ? userCoins.amount : 0}
							</p>
						</div>
					</>
				</div>
			)}
		</div>
	);
};

export default UserMenuCoins;
