import { NavLogo } from '../HeaderInner';
import styles from './AuthHeader.module.scss';

const AuthHeader = () => {
	return (
		<header className={styles['auth-header']}>
			<div className={styles['auth-header__container']}>
				<NavLogo className={styles['auth-header__logo']} />
			</div>
		</header>
	);
};

export default AuthHeader;
