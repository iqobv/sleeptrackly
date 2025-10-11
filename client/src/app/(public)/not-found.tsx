import { Button, SectionHeader } from '@/components/UI';
import { PAGES } from '@/config';
import styles from './not-found.module.scss';

export default function NotFound() {
	return (
		<div className={`container page ${styles['not-found']}`}>
			<SectionHeader
				title="404 - Page Not Found"
				description="The page you are looking for does not exist."
				containerClassName={styles['not-found__header']}
			/>
			<Button href={PAGES.HOME}>Back to Home</Button>
		</div>
	);
}
