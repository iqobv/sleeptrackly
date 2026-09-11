import { NavLogo } from '@/components/UI';
import styles from './AuthHeader.module.scss';

export const AuthHeader = () => {
	return (
		<header className={styles.authHeader}>
			<div className={styles.container}>
				<NavLogo className={styles.logo} />
			</div>
		</header>
	);
};
