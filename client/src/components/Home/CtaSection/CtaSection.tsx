import { AUTH_PAGES } from '@/config';
import { Button, SectionHeader } from '@shared/ui';
import Link from 'next/link';
import styles from './CtaSection.module.scss';

const CtaSection = () => {
	return (
		<div className={styles.cta}>
			<div className={`${styles.container} container`}>
				<SectionHeader
					title="Ready to take control of your sleep?"
					titleProps={{
						variant: 'h2',
					}}
					description="Sign up now and take control of your sleep."
					padding={0}
				/>
				<Button asChild>
					<Link href={AUTH_PAGES.REGISTER}>Sign Up For Free</Link>
				</Button>
			</div>
		</div>
	);
};

export default CtaSection;
