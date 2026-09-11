import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { Button, Container, SectionHeader } from '@shared/ui';
import Link from 'next/link';
import styles from './CtaSection.module.scss';

export const CtaSection = () => {
	return (
		<section className={styles.cta}>
			<Container className={styles.container}>
				<SectionHeader
					title="Initiate Tracking"
					titleProps={{
						variant: 'h2',
						textTransform: 'uppercase',
					}}
					description="Discipline requires action. Create your profile and log your first interval today."
					padding={0}
					textAlign="center"
				/>
				<Button asChild textTransform="uppercase" size="lg">
					<Link href={CROSS_DOMAIN_ROUTES.APP_REGISTER}>Create Account</Link>
				</Button>
			</Container>
		</section>
	);
};
