import { NavLogo } from '@/components/UI';
import styles from './AuthHeader.module.scss';

const AuthHeader = () => {
	return (
		<header className={styles.authHeader}>
			<div className={styles.container}>
				<NavLogo className={styles.logo} />
			</div>
		</header>
	);
};

export default AuthHeader;
