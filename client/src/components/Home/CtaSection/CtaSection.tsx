import { Button, SectionHeader } from '@/components/UI';
import { AUTH_PAGES } from '@/config';
import styles from './CtaSection.module.scss';

const CtaSection = () => {
	return (
		<div className={styles['cta-section']}>
			<div className={`${styles['cta-section__container']} container`}>
				<SectionHeader
					title="Ready to take control of your sleep?"
					titleComponent="h2"
					description="Sign up now and take control of your sleep."
					padding={0}
				/>
				<Button href={AUTH_PAGES.REGISTER}>Sign Up For Free</Button>
			</div>
		</div>
	);
};

export default CtaSection;
