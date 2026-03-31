import { LegalHeader } from '@/components/Layout/Header';

import { Footer } from '@/components/Layout/Footer';
import styles from './layout.module.scss';

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<LegalHeader />
			<main className={styles['legal-content']}>{children}</main>
			<Footer />
		</>
	);
}
