import { Footer } from '@/components/Layout/Footer/Footer';
import { LegalHeader } from '@/components/Layout/Header/LegalHeader/LegalHeader';
import { Container } from '@shared/ui';
import styles from './layout.module.scss';

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<LegalHeader />
			<main className={styles.legalContent}>
				<Container>{children}</Container>
			</main>
			<Footer />
		</>
	);
}
