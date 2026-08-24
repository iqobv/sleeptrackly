import { NavLinksLoader } from '../HeaderInner/NavLinks/NavLinksLoader';
import { UserMenuLoader } from '../HeaderInner/UserMenu/UserMenuLoader';
import styles from './DashboardHeader.module.scss';

export const DashboardHeaderLoader = () => (
	<>
		<nav className={styles.nav}>
			<NavLinksLoader />
		</nav>
		<UserMenuLoader />
	</>
);
