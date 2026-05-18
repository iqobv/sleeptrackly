import { Button, SectionHeader } from '@/components/UI';
import { PAGES } from '@/config';
import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
	return (
		<div className={`container page ${styles.notFound}`}>
			<SectionHeader
				title="404 - Page Not Found"
				description="The page you are looking for does not exist."
				containerClassName={styles.header}
			/>
			<Button asChild>
				<Link href={PAGES.HOME}>Back to Home</Link>
			</Button>
		</div>
	);
}
