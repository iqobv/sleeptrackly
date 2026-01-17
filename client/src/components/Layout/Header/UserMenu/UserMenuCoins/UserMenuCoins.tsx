import { Coin } from '@/components/Icons';
import { useAuth } from '@/hooks';
import styles from './UserMenuCoins.module.scss';

const UserMenuCoins = () => {
	const { user } = useAuth();

	return (
		<div className={styles['coins']}>
			<div className={styles['coins__container']}>
				{user && (
					<>
						<p className={styles['coins__label']}>Balance</p>
						<div className={styles['coins__balance']}>
							<p className={styles['coins__amount']}>{user.coins.amount}</p>
							<Coin
								className={styles['coins__icon']}
								width={40}
								height={40}
								fill="var(--color-main-text)"
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default UserMenuCoins;
