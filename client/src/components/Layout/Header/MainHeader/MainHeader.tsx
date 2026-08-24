'use client';

import { NavLogo } from '@/components/UI';
import { Header } from '../Header';
import { AuthButtons } from '../HeaderInner/AuthButtons/AuthButtons';
import { NavContainer } from '../HeaderInner/NavContainer/NavContainer';
import styles from './MainHeader.module.scss';

export const MainHeader = () => (
	<Header>
		<NavContainer withMenu={false} renderLogoInsteadOfMenu>
			<div className={styles.logo}>
				<NavLogo />
			</div>
			<AuthButtons />
		</NavContainer>
	</Header>
);
