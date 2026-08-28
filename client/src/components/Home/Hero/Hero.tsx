import { AUTH_PAGES } from '@/config/authPages.config';
import { Button, Container, SectionHeader } from '@shared/ui';
import Link from 'next/link';
import styles from './Hero.module.scss';
import { HeroChart } from './HeroChart/HeroChart';

export const Hero = () => {
	return (
		<Container as="section" className={styles.hero}>
			<div className={styles.content}>
				<SectionHeader
					title="INTENTIONAL SLEEP TRACKING"
					description="No wearables. No AI guesswork. Just manual logs and pure data. Take conscious control of your schedule."
					padding={0}
					containerClassName={styles.headerContainer}
					titleProps={{
						className: styles.title,
					}}
					descriptionProps={{
						className: styles.description,
					}}
				/>
				<Button
					className={styles.button}
					asChild
					textTransform="uppercase"
					size="lg"
				>
					<Link href={AUTH_PAGES.REGISTER}>Start Logging</Link>
				</Button>
			</div>
			<HeroChart />
		</Container>
	);
};
