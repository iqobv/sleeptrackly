'use client';

import { NavLogo } from '@/components/UI';
import { useAuth } from '@/hooks';
import AuthButtons from '../AuthButtons/AuthButtons';
import NavContainer from '../NavContainer/NavContainer';
import NavLinks from '../NavLinks/NavLinks';
import styles from './MainHeaderNav.module.scss';

const MainHeaderNav = () => {
	const { user } = useAuth();

	return (
		<NavContainer withMenu renderLogoInsteadOfMenu={!user}>
			{!!user && (
				<div className={styles.logo}>
					<NavLogo />
				</div>
			)}
			<nav className={styles.nav}>
				<NavLinks />
			</nav>
			<div>
				<AuthButtons />
			</div>
		</NavContainer>
	);
};

export default MainHeaderNav;
