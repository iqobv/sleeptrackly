import { getUserCoins } from '@/api/coin/userCoins.api';
import { Coin } from '@/components/Icons/Coin';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useQuery } from '@tanstack/react-query';
import styles from './UserMenuCoins.module.scss';
import { UserMenuCoinsLoader } from './UserMenuCoinsLoader';

export const UserMenuCoins = () => {
	const { data: userCoins, isLoading } = useQuery({
		queryFn: () => getUserCoins(),
		queryKey: QUERY_KEYS.coin.userCoin,
	});

	return (
		<div className={styles.coins}>
			{isLoading && <UserMenuCoinsLoader />}
			{userCoins && (
				<div className={styles.container}>
					<>
						<p className={styles.label}>Balance</p>
						<div className={styles.balance}>
							<Coin
								className={styles.icon}
								width={40}
								height={40}
								fill="var(--color-main-text)"
							/>
							<p className={styles.amount}>
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
