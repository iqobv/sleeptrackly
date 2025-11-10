import { Header, NavMenu } from '@/components/Layout';
import { PropsWithChildren } from 'react';
import styles from './layout.module.scss';

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div id="app">
			<Header />
			<main className={styles['main']}>
				<NavMenu />
				<div className={styles['main__content']}>{children}</div>
			</main>
		</div>
	);
}
