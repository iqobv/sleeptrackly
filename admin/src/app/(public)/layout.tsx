import { Header } from '@/components/Layout/Header/Header';
import { NavMenu } from '@/components/Layout/NavMenu/NavMenu';
import { PropsWithChildren } from 'react';
import styles from './layout.module.scss';

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div id="app">
			<Header />
			<main className={styles.main}>
				<NavMenu />
				<div className={styles.content}>{children}</div>
			</main>
		</div>
	);
}
