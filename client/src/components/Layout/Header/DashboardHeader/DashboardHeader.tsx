'use client';

import { NavLogo } from '@/components/UI';
import { Header } from '../Header';
import { NavContainer } from '../HeaderInner/NavContainer/NavContainer';
import { NavLinks } from '../HeaderInner/NavLinks/NavLinks';
import { UserMenu } from '../HeaderInner/UserMenu/UserMenu';
import styles from './DashboardHeader.module.scss';

export const DashboardHeader = () => {
	return (
		<Header>
			<NavContainer withMenu renderLogoInsteadOfMenu={false}>
				<div className={styles.logo}>
					<NavLogo />
				</div>
				<nav className={styles.nav}>
					<NavLinks />
				</nav>
				<UserMenu />
			</NavContainer>
		</Header>
	);
};
