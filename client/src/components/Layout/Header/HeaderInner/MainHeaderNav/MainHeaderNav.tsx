'use client';

import { useAuth } from '@/hooks';
import AuthButtons from '../AuthButtons/AuthButtons';
import NavContainer from '../NavContainer/NavContainer';
import NavLinks from '../NavLinks/NavLinks';
import NavLogo from '../NavLogo/NavLogo';
import styles from './MainHeaderNav.module.scss';

const MainHeaderNav = () => {
	const { user } = useAuth();

	return (
		<NavContainer withMenu renderLogoInsteadOfMenu={!user}>
			{!!user && (
				<div className={styles['main-header__logo']}>
					<NavLogo />
				</div>
			)}
			<nav className={styles['main-header__nav']}>
				<NavLinks />
			</nav>
			<div className={styles['main-header__auth-container']}>
				<AuthButtons />
			</div>
		</NavContainer>
	);
};

export default MainHeaderNav;
