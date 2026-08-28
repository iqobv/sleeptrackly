import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { Button, SectionHeader } from '@shared/ui';
import styles from './not-found.module.scss';

export default function NotFound() {
	return (
		<div className={`container page ${styles.notFound}`}>
			<SectionHeader
				title="404 - Page Not Found"
				description="The page you are looking for does not exist."
				textAlign="center"
			/>
			<Button asChild>
				<a href={CROSS_DOMAIN_ROUTES.HOME}>Back to Home</a>
			</Button>
		</div>
	);
}
