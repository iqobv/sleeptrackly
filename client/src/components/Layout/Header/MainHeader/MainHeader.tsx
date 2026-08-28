'use client';

import { NavLogo } from '@/components/UI';
import { Container } from '@shared/ui';
import { Header } from '../Header';
import { AuthButtons } from '../HeaderInner/AuthButtons/AuthButtons';
import styles from './MainHeader.module.scss';

export const MainHeader = () => (
	<Header>
		<Container className={styles.container}>
			<NavLogo hideTextOnMobile logoProps={{ width: 36, height: 36 }} />
			<AuthButtons />
		</Container>
	</Header>
);
